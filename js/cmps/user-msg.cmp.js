import { eventBus } from '../services/event-bus-service.js'

export default {
    template: `
<section v-if="msg" class="user-msg" :class="msg.type">
    <button @click="closeModal">X</button>
    <h5>{{msg.txt}}</h5>
</section>
`,
    data() {
        return {
            unsubscribe: null,
            msg: null
        }
    },
    created() {
        this.unsubscribe = eventBus.on('show-msg', this.showMsg)
    },
    methods: {
        showMsg(msg) {
            this.msg = msg
            setTimeout(() => {
                this.msg = null
            }, 3000)
        },
        closeModal() {
            this.msg = null
        }
    },
    computed: {
    },
    unmounted() {
        this.unsubscribe()
    },
}