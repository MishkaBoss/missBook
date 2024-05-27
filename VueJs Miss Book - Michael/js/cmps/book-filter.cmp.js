export default {
    props: ['books'],
    template: `
<section  class="book-filter">
    <div class="search-by-name">
        <label for="search">Search: </label>
        <input v-model="filterBy.bookName" @input="filter" type="text" id="search">
    </div>
    <div class="search-by-price">
        <label for="range">Price Range: </label>
        <input type="range" id="range" step="5" @change="filter" :min="0" :max="maxPrice"  v-model.number="filterBy.toPrice">
    </div>
</section>
`,
    data() {
        return {
            filterBy: {
                bookName: '',
                fromPrice: 0,
                toPrice: ''
            }
        }
    },
    methods: {
        filter() {
            this.$emit('filtered', { ...this.filterBy })
        },
    },
    computed: {
        maxPrice() {
            let maxPrice = Math.max(...this.books.map((book) => book.listPrice.amount))
            this.filterBy.toPrice = maxPrice
            return maxPrice
        }
    },
}