import PageManager from './page-manager';
import nod from './common/nod';
import forms from './common/models/forms';
import swal from './global/sweet-alert';
import * as api from './apis/apis';

export default class CompleteRegistration extends PageManager {
    onReady() {
        this.registerContactFormValidation();
        this.$forgotPasswordForm = $('[data-forgot-password-form]');
    }

    registerContactFormValidation() {
        const formSelector = 'form[data-complete-registration-form]';
        const completeRegistrationValidator = nod({
            submit: `${formSelector} input[type="submit"]`,
        });
        const $form = $(formSelector);
        const $submitButton = $('input[type="submit"]', $form);

        completeRegistrationValidator.add([
            {
                selector: `${formSelector} input[name="complete_firstname"]`,
                validate: (cb, val) => {
                    const result = forms.notEmpty(val);

                    cb(result);
                },
                errorMessage: 'The \'First Name\' field cannot be blank.',
            },
            {
                selector: `${formSelector} input[name="complete_lastname"]`,
                validate: (cb, val) => {
                    const result = forms.notEmpty(val);

                    cb(result);
                },
                errorMessage: 'The \'Last Name\' field cannot be blank.',
            },
            {
                selector: `${formSelector} input[name="complete_email"]`,
                validate: (cb, val) => {
                    const result = forms.email(val);

                    cb(result);
                },
                errorMessage: 'You must enter a valid email.',
            },
            {
                selector: `${formSelector} input[name="complete_customerid"]`,
                validate: (cb, val) => {
                    const result = forms.notEmpty(val);

                    cb(result);
                },
                errorMessage: 'The \'Customer ID\' field cannot be blank.',
            },
        ]);

        $form.on('submit', event => {
            event.preventDefault();
            completeRegistrationValidator.performCheck();
            $submitButton.prop('disabled', true);

            if (completeRegistrationValidator.areAll('valid')) {
                const email = $(`${formSelector} input[name="complete_email"]`).val();
                const ustomerid = $(`${formSelector} input[name="complete_customerid"]`).val();
                // set email value for forgot password form
                $('#email', this.$forgotPasswordForm).val(email);
                // check bundle b2b user
                api.checkoutB2bUser({
                    storeHash: this.context.store_hash,
                    email,
                    extraFieldName: 'customerId',
                    extraFieldValue: ustomerid,
                }).then(data => {
                    if (!data || !data.code) {
                        $submitButton.prop('disabled', false);
                        return swal.fire({
                            text: 'Network error! Please try again.',
                            icon: 'error',
                        });
                    }
                    if (data.code === 200) {
                        // submit forgot password form
                        this.$forgotPasswordForm.trigger('submit');
                    } else {
                        $submitButton.prop('disabled', false);
                        swal.fire({
                            text: 'User does not exist.',
                            icon: 'error',
                        });
                    }
                });
            } else {
                $submitButton.prop('disabled', false);
            }
        });
    }
}
