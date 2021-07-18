module.exports = class FmJsonResponse {

    code = 200;
    error = false;
    messages = [];
    form = {};
    content = {};

    hasForm = false;
    hasContent = false;

    setCode(code) {
        this.code = code;
        return this;
    }

    getCode() {
        return this.code;
    }

    setError(error) {
        this.error = error;
        return this;
    }

    getError(error) {
        return this.error;
    }

    addMessage(message) {
        this.messages.push(message);
        return this;
    }

    getMessages() {
        return this.messages;
    }

    addContent(key, value) {
        this.content[key] = value;
        this.hasContent = true;
        return this;
    }

    getContents() {
        return this.content;
    }

    addFields(fields) {
        for (let i in fields) {
            const field = fields[i];
            this.addField(field);
        }

        return this;
    }

    getFields() {
        return this.form;
    }

    addField(field) {
        this.form[field] = {
            error: false,
            messages: [],
        };
        this.hasForm = true;

        return this;
    }

    getField(field) {
        return this.form[field] ? this.form[field] : null;
    }

    setFieldError(field, error, message) {
        if (typeof message === 'undefined') {
            message = null;
        }

        this.form[field].error = error;

        if (message) {
            this.addFieldMessage(field, message);
        }

        return this;
    }

    addFieldMessage(field, message) {
        this.form[field].messages.push(message);
        return this;
    }

    generate() {
        const obj = {};

        obj.code = this.code;
        obj.error = this.error;
        obj.messages = this.messages;
        if (this.hasForm) obj.form = this.form;
        if (this.hasContent) obj.content = this.content;

        return obj;
    }

}
