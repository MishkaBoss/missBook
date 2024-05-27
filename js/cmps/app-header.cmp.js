export default {
    template: `
<header class="app-header">
    <div class="logo">
        <h1>Miss Books</h1>
    </div>
    <div class="nav-bar">
      <router-link to="/">Home</router-link> 
      <router-link to="/book">Books</router-link> 
      <router-link to="/about">About</router-link> 
    </div>
</header>
`,
    data() {
        return {
        }
    },
    methods: {
    },
    computed: {
    },
}