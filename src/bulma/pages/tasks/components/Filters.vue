<template>
    <div class="columns is-centered is-multiline">
        <div class="column is-narrow flags-filter">
            <enso-filter class="box raises-on-hover"
                v-model="filters.tasks.flag"
                icons
                :options="flagOptions"
                :name="i18n('Importance')"/>
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
</template>

<script>
import { mapState } from 'vuex';
import { EnsoFilter, BooleanFilter } from '@enso-ui/filters/bulma';
import { faFlag, faExclamation } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faFlag, faExclamation);

export default {
    name: 'Filters',

    components: { BooleanFilter, EnsoFilter },

    inject: ['i18n'],

    props: {
        filters: {
            type: Object,
            required: true,
        },
        params: {
            type: Object,
            required: true,
        },
    },

    data: () => ({
        overdueOptions: [
            { value: true, icon: 'exclamation', class: 'has-text-danger' },
        ],
    }),

    computed: {
        ...mapState(['enums']),
        flagOptions() {
            return this.enums.flags._keys().map(flag => ({
                icon: 'flag',
                value: Number.parseInt(flag),
                class: `has-text-${this.enums.flags._get(flag).toLowerCase()}`
            }));
        },
    },
};
</script>
