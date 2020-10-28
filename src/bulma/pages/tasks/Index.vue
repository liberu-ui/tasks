<template>
    <div>
        <div class="columns is-centered is-multiline"
            v-if="ready">
            <div class="column is-narrow flags-filter">
                <enso-filter class="box raises-on-hover"
                    v-model="filters.tasks.flag"
                    icons
                    :options="enums.flags._keys().map((flag) => ({
                        icon: 'flag',
                        value: parseInt(flag),
                        class: `has-text-${enums.flags._get(flag).toLowerCase()}`
                    }))"
                    :name="i18n('Flags')"/>
            </div>
            <div class="column is-narrow">
                <boolean-filter class="box raises-on-hover"
                    v-model="filters.tasks.completed"
                    icons
                    :name="i18n('Completed')"/>
            </div>
            <div class="column is-narrow">
                <enso-filter class="box raises-on-hover"
                    v-model="params.overdue"
                    icons
                    :options="overdueOptions"
                    :name="i18n('Overdue')"/>
            </div>
        </div>
        <enso-table class="box is-paddingless raises-on-hover"
            :filters="filters"
            :params="params"
            @ready="ready = true"
            @reset="$refs.filterState.reset()"
            id="tasks"
            ref="table">
            <template v-slot:completed="{ row }">
                <vue-switch class="is-medium"
                    v-model="row.completed"
                    @input="update(row)"/>
            </template>
            <template v-slot:reminder="{ row }">
                <span class="icon"
                    :class="{'tag is-table-tag is-warning': row.overdue}"
                    v-tooltip="row.reminder"
                    v-if="row.reminder">
                    <fa icon="clock"/>
                </span>
                <span v-else/>
            </template>
            <template v-slot:name="{ row }">
                <span v-tooltip="row.description">
                    {{ row.name }}
                </span>
            </template>
            <template v-slot:flag="{ row, column }">
                <v-popover trigger="click"
                    placement="top"
                    :ref="`flag-${row.id}`">
                    <span class="icon"
                        :class="`has-text-${column.enum._get(row.flag).toLowerCase()}`"
                        v-tooltip="row.reminder"
                        v-if="column.enum._get(row.flag)">
                        <fa icon="flag"/>
                    </span>
                    <span v-else>
                        -
                    </span>
                    <template v-slot:popover>
                        <flags :value="row.flag"
                            @input="updateFlag($event, row)"/>
                    </template>
                </v-popover>
            </template>
            <template v-slot:createdBy="{ row: { createdBy } }">
                <avatar class="is-24x24"
                    :user="createdBy"/>
            </template>
            <template v-slot:allocatedTo="{ row }">
                <v-popover trigger="click"
                    placement="top"
                    :ref="`allocatedTo-${row.id}`"
                    v-if="canChangeAllocatedTo">
                    <avatar class="is-24x24"
                        :user="row.allocated_to"/>
                    <template v-slot:popover>
                        <div class="allocated-to">
                            <enso-select v-model="row.allocated_to.id"
                                @select="$refs[`allocatedTo-${row.id}`].hide(); update(row)"
                                source="administration.users.options"
                                disable-clear
                                label="person.name"/>
                        </div>
                    </template>
                </v-popover>
                <avatar class="is-24x24"
                    :user="row.allocated_to"
                    v-else/>
            </template>
        </enso-table>

        <filter-state :api-version="apiVersion"
            name="tasks_filter"
            :filters="filters"
            :params="params"
            @ready="ready = true"
            ref="filterState"/>
    </div>
</template>

<script>
import { EnsoFilter, BooleanFilter } from '@enso-ui/filters/bulma';
import { FilterState } from '@enso-ui/filters/renderless';
import { EnsoTable } from '@enso-ui/bulma';
import { EnsoSelect } from '@enso-ui/select/bulma';
import VueSwitch from '@enso-ui/switch/bulma';
import Avatar from '@enso-ui/ui/src/bulma/pages/administration/users/components/Avatar.vue';
import { faExclamation, faClock, faFlag } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { VTooltip, VPopover } from 'v-tooltip';
import { mapState } from 'vuex';
import Flags from './components/Flags.vue';

library.add(faExclamation, faClock, faFlag);

export default {
    name: 'Index',

    inject: ['i18n', 'route', 'toastr', 'errorHandler'],

    directives: { tooltip: VTooltip },

    components: {
        Avatar,
        EnsoTable,
        BooleanFilter,
        FilterState,
        VueSwitch,
        EnsoFilter,
        VPopover,
        Flags,
        EnsoSelect,
    },

    computed: {
        ...mapState(['enums', 'user']),
        canChangeAllocatedTo() {
            return [
                this.enums.roles.Admin, this.enums.roles.Supervisor,
            ].includes(`${this.user.role.id}`);
        },
    },

    data: () => ({
        apiVersion: 1.0,
        ready: false,
        filters: {
            tasks: {
                completed: false,
                flag: null,
            },
        },
        params: {
            overdue: null,
        },
        overdueOptions: [
            { value: true, icon: 'exclamation', class: 'has-text-danger' },
        ],
    }),

    methods: {
        update({
            // eslint-disable-next-line camelcase
            id, completed, description, flag, name, allocated_to,
        }) {
            // eslint-disable-next-line camelcase
            allocated_to = allocated_to?.id;

            axios.patch(this.route('tasks.update', { task: id }), {
                completed, description, flag, name, allocated_to,
            }).then(({ data: { message } }) => {
                this.toastr.success(message);
                this.$refs.table.fetch();
            }).catch(this.errorHandler);
        },

        updateFlag(flag, row) {
            row.flag = flag;
            this.$refs[`flag-${row.id}`].hide();
            this.update(row);
        },
    },
};
</script>
<style lang="scss">
.allocated-to {
    width: 250px;

    .dropdown.vue-dropdown .dropdown-trigger .button.input .angle {
        right: 0.5rem;
    }
}

.flags-filter {
    li.is-active a {
        background-color: rgba(#ffdd57, 0.25) !important;
    }
}
</style>
