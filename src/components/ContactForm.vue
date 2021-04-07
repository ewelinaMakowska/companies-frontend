<template>
           
  <form
    novalidate
    @submit="submitForm($event)"
    id="contact-form"
    class="contact-form"
  >

    <h2>Skontaktuj się z nami!</h2>

    <div class="contact-form__group">
      <label for="contact-form__name">Imię:</label>
      <input
      id="contact-form__name"
      name="contact-form__name"
      type="text"
      placeholder="Twoje imię"
      autocomplete="off"
      >
    </div>

  
    <div class="contact-form__group">
      <label for="contact-form__email">E-mail:</label>
      <input
      id="contact-form__email"
      name="contact-form__email"
      type="email"
      placeholder="Twój adres e-mail"
      autocomplete="off"
      >
    </div>
    
    
    <div class="contact-form__group">
      <label for="contact-form__message">Wiadomość:</label>
      <textarea 
      id="contact-form__message" 
      class="contact-form__message" 
      placeholder="Twoja wiadomość do nas"
      autocomplete="off"
      />
    </div>
    
    
    <input
      class="contact-form__submit"
      type="submit"
      value="Wyślij"
    >

  </form>
</template>


<script>
import ContactService from '../services/ContactService'

export default {
  props: {
    company: Object
  },

  methods: {
    async submitForm(e) {
      e.preventDefault()

      const eMailData = {
        name: document.getElementById('contact-form__name').value,
        email: document.getElementById('contact-form__email').value,
        message: document.getElementById('contact-form__message').value,
        company: this.$props.company.email
      }

      console.log('Form submitted!')
      console.log(`Name: ${eMailData.name}`)
      console.log(`Mail: ${eMailData.email}`)
      console.log(`Message: ${eMailData.message}`)
      console.log(`Company e-mail: ${eMailData.company}`)

      try {
        await ContactService.mailCompany(eMailData)
      } catch (err) {
        console.log(err)
      }
    }

  } 

  }

</script>
