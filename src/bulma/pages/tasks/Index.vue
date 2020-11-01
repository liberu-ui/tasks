<template>
    <div class="wrapper">
        <filters :filters="filters"
            :params="params"
            v-if="ready"/>
        <enso-table class="box is-paddingless raises-on-hover"
            :filters="filters"
            :params="params"
            @ready="ready = true"
            @reset="$refs.filterState.reset()"
            id="tasks"
            ref="table">
            <template v-slot:name="{ row }">
                <span>
                    {{ row.name }}
                </span>
                <span class="icon is-small has-text-info is-clickable"
                    v-tooltip="row.description">
                    <fa icon="info-circle"
                        size="xs"/>
                </span>
            </template>
            <template v-slot:flag="{ row, column }">
                <v-popover trigger="click"
                    :ref="`flag-${row.id}`">
                    <span class="icon is-clickable"
                        :class="`has-text-${column.enum._get(row.flag).toLowerCase()}`"
                        v-if="column.enum._get(row.flag)">
                        <fa icon="flag"/>
                    </span>
                    <span class="icon is-naked is-clickable is-small"
                        v-else>
                        <fa icon="cog"
                            size="xs"/>
                    </span>
                    <template v-slot:popover>
                        <flags v-model="row.flag"
                            @input="update(row); $refs[`flag-${row.id}`].hide()"/>
                    </template>
                </v-popover>
            </template>
            <template v-slot:reminder="{ row }">
                <span class="icon is-clickable"
                    :class="row.overdue ? 'has-text-danger' : 'has-text-success'"
                    v-tooltip="row.reminder"
                    v-if="row.reminder">
                    <fa icon="clock"/>
                </span>
                <span class="icon is-naked is-clickable is-small"
                    v-else>
                    <fa icon="cog"
                        size="xs"/>
                </span>
            </template>
            <template v-slot:allocatedTo="{ row }">
                <v-popover trigger="click"
                    :ref="`allocatedTo-${row.id}`"
                    v-if="canChangeAllocation">
                    <avatar class="is-24x24 is-clickable"
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
            <template v-slot:completed="{ row }">
                <vue-switch class="is-medium"
                    v-model="row.completed"
                    @input="update(row)"/>
            </template>
            <template v-slot:createdBy="{ row: { createdBy } }">
                <avatar class="is-24x24"
                    :user="createdBy"/>
            </template>
        </enso-table>
        <filter-state :api-version="apiVersion"
            name="taskFilters"
            :filters="filters"
            :params="params"
            @ready="ready = true"
            ref="filterState"/>
    </div>
</template>

<script>
import { FilterState } from '@enso-ui/filters/renderless';
import { EnsoTable } from '@enso-ui/bulma';
import { EnsoSelect } from '@enso-ui/select/bulma';
import VueSwitch from '@enso-ui/switch/bulma';
import Avatar from '@enso-ui/ui/src/bulma/pages/administration/users/components/Avatar.vue';
import { faClock, faInfoCircle, faCog } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { VTooltip, VPopover } from 'v-tooltip';
import { mapState } from 'vuex';
import Filters from './components/Filters.vue';
import Flags from './components/Flags.vue';

library.add(faClock, faInfoCircle, faCog);

export default {
    name: 'Index',

    inject: ['route', 'toastr', 'errorHandler'],

    directives: { tooltip: VTooltip },

    components: {
        Avatar,
        EnsoTable,
        FilterState,
        VueSwitch,
        VPopover,
        Filters,
        Flags,
        EnsoSelect,
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
    }),

    computed: {
        ...mapState(['enums', 'user']),
        canChangeAllocation() {
            return [
                this.enums.roles.Admin, this.enums.roles.Supervisor,
            ].includes(`${this.user.role.id}`);
        },
    },

    methods: {
        update({
            // eslint-disable-next-line camelcase
            id, completed, description, flag, name, allocated_to,
        }) {
            axios.patch(this.route('tasks.update', { task: id }), {
                completed, description, flag, name, allocated_to: allocated_to?.id,
            }).then(({ data: { message } }) => {
                this.toastr.success(message);
                this.$refs.table.fetch();
            }).catch(this.errorHandler);
        },
    },
};
</script>

<style lang="scss">
.allocated-to {
    width: 250px;

    .dropdown.vue-dropdown {
        .dropdown-trigger .button.input .angle {
            right: 0.5rem;
        }

        .dropdown-menu .dropdown-content .dropdown-item .icon.selected {
            right: 0.6rem;
        }
    }
}
</style>
