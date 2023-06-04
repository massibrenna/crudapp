export interface FormValue {
  [K: string]: string;
}
export interface FormErrors {
  [K: string]: string[];
}
function isEmpty(value: any) {
  return value === "" || value === null || value === undefined;
}

type rules = Array<FormRules>;
interface FormRules {
  key: string;
  label: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
  pattern?: RegExp;
  validator?: (value: string) => OneError;
}
type OneError = string | Promise<string>;

// funzione di validazione:
const validator = (
  formValue: FormValue,
  rules: rules,
  callback: (errors: any) => void
) => {
  const result: any = {};

  const addErrors = (key: string, error: OneError) => {
    //console.log("key:" + key, "error:" + error);
    // console.log(result);
    if (result[key] === undefined) {
      result[key] = [];
    }
    result[key].push(error);
  };

  rules.forEach((r) => {
    console.log("formValue: " + formValue);
    console.log("eseguo rule: " + r);
    let value = formValue[r.key];
    console.log(value);

    if (r.validator) {
      console.log("r has Svalidator");
      const promise = r.validator(value);
      addErrors(r.key, promise);
    }
    if (isEmpty(value) && r.required) {
      addErrors(r.key, `${r.label} Non può essere vuoto`);
    }
    if (!isEmpty(value) && value.length < r.minLength!) {
      addErrors(r.key, `${r.label} ha una lubghezza minima di${r.minLength!}`);
    }
    if (!isEmpty(value) && value.length > r.maxLength!) {
      addErrors(r.key, `${r.label} ha una lunghezza massima di${r.maxLength!}`);
    }
    if (!isEmpty(value) && parseInt(value, 10) < r.minValue!) {
      addErrors(r.key, `${r.label} il minimo è${r.minValue!}`);
    }
    if (!isEmpty(value) && parseInt(value, 10) > r.maxValue!) {
      addErrors(r.key, `${r.label} il massimo è${r.maxValue!}`);
    }
    if (!isEmpty(value) && r.pattern && !r.pattern.test(value)) {
      addErrors(r.key, `${r.label} non è nel formato corretto`);
    }
  });
  console.log(result);
  const errors = Object.keys(result).map((k) => {
    return result[k].map((promise: OneError) => [k, promise]);
  });
  console.log(errors);

  const newPromises = flat(errors).map(([key, promiseOrString]) =>
    (promiseOrString instanceof Promise
      ? promiseOrString
      : Promise.reject(promiseOrString)
    ).then(
      () => [key, undefined],
      (reason) => [key, reason]
    )
  );
  Promise.all(newPromises).then((results) => {
    console.log(results instanceof Array<String[]>);
    results.map((r) => console.log(r instanceof Array<String>));
    console.log(results);
    callback(zip(results.filter((i) => i[1])));
  });
};

export const noErrors = (value: any) => {
  console.log(Object.values(value));
  return Object.values(value).length === 0;
};

// funzioni di utilità:

function flat(array: any[]) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] instanceof Array) {
      result.push(...array[i]);
    } else {
      result.push(array[i]);
    }
  }
  return result;
}

function zip(list: Array<string[]>) {
  const result: { [key: string]: string[] } = {};
  list.forEach(([key, value]) => {
    result[key] = result[key] || [];
    result[key].push(value);
  });
  console.log(result);
  return result;
}
export default validator;
