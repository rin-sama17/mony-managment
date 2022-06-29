type s = string
type n = number

//----------------------------------------------

interface HasFormatter {
  wrapper(): s
}

//----------------------------------------------

//بدهکار
class indebted implements HasFormatter {
  constructor(public customer: s, readonly amount: n, private details: s) {}

  wrapper() {
    return `${this.customer}-${this.amount} تومان بدهکاری برای ${this.details}`
  }
}

//----------------------------------------------

//طلبکار
class creditorw implements HasFormatter {
  constructor(public customer: s, readonly amount: n, private details: s) {}

  wrapper() {
    return `${this.customer}-${this.amount} تومان طلبکار برای ${this.details}`
  }
}

//----------------------------------------------

class addListElement {
  constructor(private container: HTMLDivElement) {}

  render(
    item: HasFormatter,
    heading: string,
    divClass: 'alert alert-info' | 'alert alert-warning',
  ) {
    const div = document.createElement('div') as HTMLDivElement
    div.className = divClass

    const ui = document.createElement('ui')

    const h2 = document.createElement('h2')
    h2.innerText = heading
    ui.append(h2)

    const h6 = document.createElement('h6')
    h6.innerText = item.wrapper()
    ui.append(h6)

    const button = document.createElement('button')
    button.className = 'btn m-2'
    button.innerHTML = '<p></p><i class="fas fa-eraser mx-2"/>'
    button.addEventListener('click', () => {
      div.remove()
    })
    ui.append(button)

    div.append(ui)

    this.container.appendChild(div)
  }
}

//----------------------------------------------

// نوع
const types = document.querySelector('#type') as HTMLSelectElement

// به/از
const customer = document.querySelector('#customer') as HTMLInputElement

// مقدار(تومان)
const amount = document.querySelector('#amount') as HTMLInputElement

// جزئیات
const details = document.querySelector('#details') as HTMLInputElement

const form = document.querySelector('#main') as HTMLFormElement

const OutPut = document.querySelector('#Output') as HTMLDivElement

const list = new addListElement(OutPut)

form.addEventListener('submit', (event: Event) => {
  event.preventDefault()

  let docs: HasFormatter

  if (types.value === 'صورتحساب') {
    docs = new indebted(customer.value, amount.valueAsNumber, details.value)
    list.render(docs, types.value, 'alert alert-info')
  }
  if (types.value === 'پرداخت') {
    docs = new creditorw(customer.value, amount.valueAsNumber, details.value)
    list.render(docs, types.value, 'alert alert-warning')
  }
  if (types.value === 'نوع') {
    alert('فیلد نوع الزامی است!')
  }
})
