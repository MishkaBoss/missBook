import { bookService } from "../services/book-service.js"
import { eventBus } from "../services/event-bus-service.js"

bookService

export default {
    template: `
 <section class="review-add app-main">
        <h3>Add a review</h3>
        <form  @submit.prevent="add">
            <label for="full-name"> Full Name: </label>
            <input ref="fullName" required type="text" id="full-name" v-model="review.fullName">
            <label for="stars"> Stars: </label>
            <select required id="stars" v-model="review.stars">
                <option value="1" selected>1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <label for="read-at" >Read At: </label>
            <input required type="date" id="read-at" v-model="review.readAt">
            <label for="review-text">Write review: </label>
            <textarea required name="" id="review-text" cols="30" rows="10" placeholder="Add your review here" v-model="review.reviewText"></textarea>
            <button>Post Review</button>
        </form>
        

        <section v-if="book" class="review-list">
        <h3>Book Reviews</h3>
        <ul v-if="book.reviews">
            <li v-for="review in book.reviews">
                <section class="review-list-container">
                    <section class="review-container">
                        <h5>Name: {{review.fullName}}</h5>
                        <h5>Rate: {{review.stars}}</h5>
                        <h5>Read At: {{review.readAt}}</h5>
                        <p>{{review.reviewText}}</p>
                    </section>
                    <section class="review-action">
                        <button @click="remove(review.id)">X</button>
                    </section>
                </section>
            </li>
        </ul>
    </section>
    </section>
`,
    data() {
        return {
            book: null,
            review: {
                fullName: '',
                stars: 1,
                readAt: null,
                reviewText: ''
            }
        }
    },
    created() {
        const { bookId } = this.$route.params
        bookService.get(bookId)
            .then(book => {
                this.book = book
            })
            .catch(err => {
                console.log('error', err)
            })

    },
    methods: {
        add() {
            bookService.addReview(this.book.id, this.review)
                .then(book => {
                    this.book = book
                    this.review = bookService.getEmptyReview()
                    eventBus.emit('show-msg', { txt: 'Review added successfully', type: 'success' })
                })
        },
        remove(reviewId) {
            bookService.removeReview(this.book.id, reviewId)
                .then(book => {
                    this.book = book
                    eventBus.emit('show-msg', { txt: 'Review removed successfully', type: 'success' })
                })
                .catch(err => {
                    console.log('error', err)
                })
        }
    },
    computed: {

    },
    mounted() {
        this.$refs.fullName.focus()
        // console.log(`mounted ~ this.$refs.fullName:`, this.$refs.fullName)
    },
}