import Cookies from 'js-cookie';

export const getCookie = (name: string): string | undefined => {
  return Cookies.get(name);
};

export const deleteCookie = (): void => {
    const cookies = Cookies.get();
    Object.keys(cookies).forEach((cookieName) => {
        Cookies.remove(cookieName);
    });
};
