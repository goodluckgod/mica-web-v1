import data from "@/assets/json/categories.json";

export default (context, inject) => {
  const findslug = (object, slug) => {
    if (object.slug === slug) {
      return object;
    }
    if (object.children) {
      for (const child of object.children) {
        const result = findslug(child, slug);
        if (result) {
          return result;
        }
      }
    }
    return null;
  };

  const searchslug = (slug) => {
    for (const item of data) {
      const found = findslug(item, slug);
      if (found) {
        return found;
      }
    }
    return null;
  };

  inject("searchslug", searchslug);
};
