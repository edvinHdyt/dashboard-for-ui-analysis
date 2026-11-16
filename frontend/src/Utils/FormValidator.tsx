export function createFormValidator() {
  let valid = true;

  const setError = (
    target: HTMLElement | string | null,
    message?: string
  ): boolean => {
    const el =
      typeof target === "string" ? document.getElementById(target) : target;

    if (!el) return valid;

    if (message) {
      el.textContent = message;
      el.classList.remove("hidden");
      valid = false;
      return false;
    }

    el.textContent = "";
    el.classList.add("hidden");
    return true;
  };

  const resetErrors = (ids: string[]): void => {
    valid = true;
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.textContent = "";
        el.classList.add("hidden");
      }
    });
  };

  return {
    setError,
    resetErrors,
    isValid: () => valid,
  };
}


export default createFormValidator;

