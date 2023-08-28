import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure,
} from "vee-validate";
import {
  required,
  alpha_spaces as alphaSpaces,
  email,
  max,
  min,
  confirmed,
  integer,
  not_one_of as excluded,
  alpha_dash as alphaDash,
} from "@vee-validate/rules";

export default {
  install(app) {
    app.component("VeeForm", VeeForm);
    app.component("VeeField", VeeField);
    app.component("ErrorMessage", ErrorMessage);

    defineRule("required", required);
    defineRule("alphaSpaces", alphaSpaces);
    defineRule("alphaDash", alphaDash);
    defineRule("email", email);
    defineRule("max", max);
    defineRule("min", min);
    defineRule("passwords_mismatch", confirmed);
    defineRule("integer", integer);
    defineRule("excluded", excluded);
    defineRule("tos", required);

    configure({
      generateMessage: (ctx) => {
        const errorMessages = {
          required: `*Este campo es requerido.`,
          min: `*El campo es muy corto.`,
          max: `*El campo es muy largo.`,
          alphaSpaces: `*El campo solo puede contener caracteres alfabéticos y espacios.`,
          alphaDash: `*The ${ctx.field} may only contain alphabetic characters numbers, dashes, or underscores.`,
          email: `*El ${ctx.field} debe ser un email válido.`,
          min_value: `The ${ctx.field} is too low.`,
          max_value: `The ${ctx.field} is too high.`,
          integer: `*El valor del campo debe ser numérico.`,
          excluded: `*The password typed is not allowed. Try to add another password.`,
          passwords_mismatch: `Las contraseñas no coinciden.`,
          tos: `*Debes aceptar los terminos y condiciones.`,
        };

        const errorMessage = errorMessages[ctx.rule.name]
          ? errorMessages[ctx.rule.name]
          : `The field ${ctx.field} is invalid.`;

        return errorMessage;
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true,
    });
  },
};
