import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh =  () => {

        const local = JSON.parse(localStorage.getItem("loginData"))
        const { user, pwd, img, accessToken, roles } = local
        setAuth({ user, pwd, img, accessToken, roles });
        return true;
    }
    return refresh;
};

export default useRefreshToken;