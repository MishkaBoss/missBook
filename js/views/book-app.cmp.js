import { bookService } from '../services/book-service.js'
import { eventBus } from '../services/event-bus-service.js'
import bookList from '../cmps/book-list.cmp.js'
import bookFilter from '../cmps/book-filter.cmp.js'
import bookDetails from './book-details.cmp.js'

export default {
    template: `
<section class="book-app">
    <book-filter @filtered="setFilter" v-if="books" :books="books"></book-filter>
    <book-list :books="booksToShow" @selected="selectBook"></book-list>
</section>
`,
    components: {
        bookList,
        bookFilter,
        bookDetails
    },
    data() {
        return {
            books: null,
            filterBy: null,
            selectedBook: null
        }
    },
    methods: {
        selectBook(book) {
            this.selectedBook = book
        },
        setFilter(filterBy) {
            this.filterBy = filterBy
        },
    },
    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books
            const regex = new RegExp(this.filterBy.bookName, "i")
            return this.books.filter(book =>
                regex.test(book.title) && book.listPrice.amount <= this.filterBy.toPrice
            )
        },
    },
    created() {
        bookService.query()
            .then(books => {
                this.books = books
                eventBus.emit('show-msg', { txt: 'Books loaded successfully', type: 'success' })
            })
            .catch(err => {
                console.log('err', err)
                eventBus.emit('show-msg', { txt: 'Loading failed', type: 'error' })
            })


    },
}