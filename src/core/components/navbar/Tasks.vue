<script>
import { debounce } from 'lodash';
import { mapState, mapGetters, mapActions } from 'vuex';
import format from '@enso-ui/ui/src/modules/plugins/date-fns/format';

export default {
    name: 'Tasks',

    inject: ['canAccess', 'errorHandler', 'route', 'toastr'],

    props: {
        paginate: {
            type: Number,
            default: 200,
        },
    },

    data: () => ({
        echo: null,
        loading: false,
        offset: 0,
        overdue: 0,
        pending: 0,
        tasks: [],
    }),

    computed: {
        ...mapGetters('websockets', ['task']),
        ...mapState('layout', ['isTouch']),
        ...mapState(['enums', 'meta']),
    },

    created() {
        if (!this.canAccess('tasks.count')) {
            return;
        }

        this.fetch = debounce(this.fetch, 500);
        this.count();
        this.connect();
        this.listen();
    },

    methods: {
        ...mapActions('websockets', ['connect']),
        computeScrollPosition(event) {
            const a = event.target.scrollTop;
            const b = event.target.scrollHeight - event.target.clientHeight;

            if (a / b > 0.7) {
                this.fetch();
            }
        },
        count() {
            axios.get(this.route('tasks.count'))
                .then(({ data }) => this.updateCounters(data))
                .catch(this.errorHandler);
        },
        dateTime(dateTime) {
            return format(dateTime, `${this.meta.dateFormat} H:i`);
        },
        flagClass(id) {
            // eslint-disable-next-line no-underscore-dangle
            return `has-text-${this.enums.flags._get(id).toLowerCase()}`;
        },
        fetch() {
            if (this.loading) {
                return;
            }

            this.loading = true;

            axios.get(this.route('tasks.index'), {
                params: { offset: this.offset, paginate: this.paginate },
            }).then(({ data }) => {
                this.tasks = this.offset ? this.tasks.concat(data) : data;
                this.offset = this.tasks.length;
                this.loading = false;
            }).catch(this.errorHandler);
        },
        listen() {
            window.Echo.private(this.task)
                .listen('.updated', data => {
                    this.offset = 0;
                    this.tasks = [];
                    this.updateCounters(data);
                });
        },
        updateCounters({ overdueCount, pendingCount }) {
            this.overdue = overdueCount;
            this.pending = pendingCount;
        },
        visitTask({ id }) {
            const name = 'tasks.edit';

            if (this.$route.name !== name || this.$route.params?.task !== id) {
                this.$router.push({ name, params: { task: id } });
            }
        },
        visitTasks() {
            const name = 'tasks.index';

            if (this.$route.name !== name) {
                this.$router.push({ name });
            }
        },
    },

    render() {
        return this.$scopedSlots.default({
            allowed: this.canAccess('tasks.index'),
            dateTime: this.dateTime,
            events: {
                scroll: e => this.computeScrollPosition(e),
            },
            fetch: this.fetch,
            flagClass: this.flagClass,
            loading: this.loading,
            overdue: this.overdue,
            pending: this.pending,
            tasks: this.tasks,
            visitTask: this.visitTask,
            visitTasks: this.visitTasks,
        });
    },
};
</script>
