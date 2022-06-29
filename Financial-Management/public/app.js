"use strict";
//----------------------------------------------
//بدهکار
class indebted {
    constructor(customer, amount, details) {
        this.customer = customer;
        this.amount = amount;
        this.details = details;
    }
    wrapper() {
        return `${this.customer}-${this.amount} تومان بدهکاری برای ${this.details}`;
    }
}
//----------------------------------------------
//طلبکار
class creditorw {
    constructor(customer, amount, details) {
        this.customer = customer;
        this.amount = amount;
        this.details = details;
    }
    wrapper() {
        return `${this.customer}-${this.amount} تومان طلبکار برای ${this.details}`;
    }
}
//----------------------------------------------
class addListElement {
    constructor(container) {
        this.container = container;
    }
    render(item, heading, divClass) {
        const div = document.createElement('div');
        div.className = divClass;
        const ui = document.createElement('ui');
        const h2 = document.createElement('h2');
        h2.innerText = heading;
        ui.append(h2);
        const h6 = document.createElement('h6');
        h6.innerText = item.wrapper();
        ui.append(h6);
        const button = document.createElement('button');
        button.className = 'btn m-2';
        button.innerHTML = '<p></p><i class="fas fa-eraser mx-2"/>';
        button.addEventListener('click', () => {
            div.remove();
        });
        ui.append(button);
        div.append(ui);
        this.container.appendChild(div);
    }
}
//----------------------------------------------
// نوع
const types = document.querySelector('#type');
// به/از
const customer = document.querySelector('#customer');
// مقدار(تومان)
const amount = document.querySelector('#amount');
// جزئیات
const details = document.querySelector('#details');
const form = document.querySelector('#main');
const OutPut = document.querySelector('#Output');
const list = new addListElement(OutPut);
form.addEventListener('submit', (event) => {
    event.preventDefault();
    let docs;
    if (types.value === 'صورتحساب') {
        docs = new indebted(customer.value, amount.valueAsNumber, details.value);
        list.render(docs, types.value, 'alert alert-info');
    }
    if (types.value === 'پرداخت') {
        docs = new creditorw(customer.value, amount.valueAsNumber, details.value);
        list.render(docs, types.value, 'alert alert-warning');
    }
    if (types.value === 'نوع') {
        alert('فیلد نوع الزامی است!');
    }
});
