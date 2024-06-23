export default ({ app }, inject) => {
  inject("addfavorite", async (selected) => {
    if (app.$auth.user) {
      if (selected) {
        try {
          const response = await app.$axios.post(
            "/v1/profile/customer/favorites/add",
            {
              mainid: selected.mainid,
            }
          );
          if (response.data.status == "success") {
            app.$auth.fetchUser();
          }
        } catch (error) {
          console.error("Favori eklerken bir hata oluştu:", error);
          throw error;
        }
      }
    } else {
      console.log(window.location);
      app.router.push("/login");
    }
  });

  inject("followstore", async (store) => {
    if (app.$auth.user) {
      if (store) {
        try {
          let id = store.storeid ? store.storeid : store.id;
          const response = await app.$axios.get(
            "/v1/profile/customer/follow/store/" + id
          );
          if (response.data.status == "success") {
            app.$auth.fetchUser();
          }
        } catch (error) {
          console.error("Favori eklerken bir hata oluştu:", error);
          throw error;
        }
      }
    } else {
      app.router.push("/login");
    }
  });
};
