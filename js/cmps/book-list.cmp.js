import bookPreview from "../cmps/book-preview.cmp.js"

export default {
    props: ["books"],
    template: `
    <section class="book-list">
    <h1>book-list</h1>
        <ul>
            <li v-for="book in books" :key="book.id" class="book-preview-container">
                <book-preview :book="book"></book-preview>
                <router-link :to="'/book/' + book.id">Details</router-link>
            </li>
        </ul>
    </section>
`,
    components: {
        bookPreview
    },
}