//console.log ('LOAD MODEL JS')
window.Model = function (collectionKey) {
    this.collectionKey = collectionKey;
    this.record = null;
};

window.Model.prototype = {
    key: function () {
        return this.collection()._name + 'Id';
    },

    collection: function () {
        if (!this._collection) this._collection = window[this.collectionKey];

        return this._collection;
    },

    init: function () {
        

        this.load();

        if (!this.record) this.record = {};

        if (!this.record.id) this.saveId();

        return this.record;
    },

    get: function () {
        if (!this.record) this.init();
        //if (!this.record.id) this.saveId();

        return this.record;
    },

    load: function (id) {
        if (!id) id = Session.get(this.key());
        else Session.set(this.key(), id);

        this.record = this.collection().findOne({_id: id});

        return this.record;
    },

    insert: function (data) {
        if (!data) data = {};

        data.entryDate = new Date();

        Session.set(this.key(), this.collection().insert(data));

        return this.load();
    },

    saveId: function () {
        var last;

        last = this.collection().findOne({id: {$gt: 1}}, {sort: {id: -1}});

        if (!last) {
            console.log( 'There are currently records with ID. Making one up out of thing air.');
            last = {id: 5000};
        }

        this.record.id = last.id + 1;
        this.update();
    },

    set: function (field, value) {
        this.record[field] = value;
    },

    update: function () {
        return this.collection().update(this.record._id, this.buildSet());
    },

    buildSet: function () {
        var set = {};
        
        _.each(this.fields, function (field) {
            set[field] = this.record[field]
        }, this);

        return {$set: set};
    },

    save: function () {
        var id = this.record._id;

        if (id) this.update();
        else this.insert(this.record);
    },

    cleanup: function () {
        this.record = null;
        Session.set(this.key(), null);
    },

    phantom: function () {
        return !Session.get(this.key());
    }
};


window.Transaction = function () {
    this.collectionKey = 'Transactions';
    this.record = null;
    this.fields = [
        'id',
        'vendor',
        'amount',
        'date',
        'category',
        'description'
    ]
};

window.Transaction.prototype = new window.Model();
window.Transaction.prototype.constructor = window.Transaction;