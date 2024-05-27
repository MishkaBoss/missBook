export default {
    props: ["book"],
    template: `
    <section class="book-preview">
        <div class="book-img">
            <img :src="setImage" alt="">
        </div>
        <div class="book-title">
            <h4>Title: </h4> <span>{{book.title}}</span>
        </div>
        <div class="book-price">
            <h4>Price: </h4><span>{{book.listPrice.amount}}{{insertCurrencyIcon}}</span>
        </div>
    </section>
`,
    data() {
        return {
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
    },

}