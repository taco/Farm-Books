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

    set: function (field, value) {
        this.record[field] = value;
    },

    update: function () {
        return this.collection().update({_id: this.record._id}, this.record);
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