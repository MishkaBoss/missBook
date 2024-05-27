import { bookService } from "../services/book-service.js"
import reviewAdd from "./review-add.cmp.js"

export default {
    // props: ["book"],
    template: `
<section v-if="book" class="book-details app-main">
    <section class="book-full-details-container">
        <div class="book-details-img-container">
            <router-link to="/book">
                Back
            </router-link>
            <img :src="setImage" alt="">
        </div>
        <div v-if="book" class="book-details-container">
            <h3>Title: {{book.title}}</h3>
            <h4>{{book.subtitle}}</h4>
            <h5>Authors</h5>

            <div v-for="author in book.authors">
                <h6>-{{ author }}</h6>
            </div>

            <h5>Published: {{book.publishedDate}}</h5>
            <h5>Pages: {{book.pageCount}}</h5>
            <h5>Categories:</h5>

            <div v-for="(category) in book.categories" class="book-categories">
                <h6>-{{category}}</h6>
            </div>

            <h5>Price: {{book.listPrice.amount}}{{insertCurrencyIcon}}</h5>
        </div>
    </section>
    <router-link :to="'/book/' + book.id +'/add-review'">Add Review</router-link>

</section>
`,
    comments: {
        reviewAdd
    },
    data() {
        return {
            book: null,
            review: {
                fullName: '',
                stars: '',
                date: '',
                reviewText: ''
            }
        }
    },
    methods: {
    },
    computed: {
        insertCurrencyIcon() {
            if (this.book.listPrice.currencyCode === 'ILS') { return '₪' }
            if (this.book.listPrice.currencyCode === 'USD') { return '$' }
            if (this.book.listPrice.currencyCode === 'EUR') { return '€' }
        },
        setImage() {
            return this.book.thumbnail
        },
        setDate() {
            let date = bookService.getDate()
            this.review.date = date
        },

    },
    created() {
        const id = this.$route.params.bookId
        bookService.get(id).then(book => this.book = book)


    },
}