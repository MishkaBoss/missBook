import { router } from "./router.js"
import appHeader from "./cmps/app-header.cmp.js"
import appFooter from "./cmps/app-footer.cmp.js"
import userMsg from "./cmps/user-msg.cmp.js"


const options = {
    template: `
    <section>
        <app-header></app-header>
        <user-msg></user-msg>
        <router-view></router-view>
        <app-footer></app-footer>
    </section>
    `,
    components: {
        appHeader,
        userMsg,
        appFooter
    }
}



const app = Vue.createApp(options)
app.use(router)
app.mount('#app')