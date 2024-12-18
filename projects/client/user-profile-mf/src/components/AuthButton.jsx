import {
  createEffect,
  createResource,
  createSignal,
  Match,
  Switch,
} from "solid-js";
import { useUserContext } from "../context/UserContext";

const AuthButton = () => {
  const { user, logout } = useUserContext();
  return (
    <ul className="flex gap-4 items-center">
      <li>
        <Switch>
          <Match when={!user()}>
            <a
              href="/user/login"
              className="bg-white text-green-700 border px-4 py-2"
            >
              Đăng nhập
            </a>
          </Match>
          <Match when={user()}>
            <a
              href="/user"
              className="text-sm bg-white text-green-700 px-4 py-2 flex flex-col border border-green-700 hover:bg-green-700 hover:text-white transition-colors"
            >
              Hồ sơ của bạn
            </a>
          </Match>
        </Switch>
      </li>

      <li>
        <Switch>
          <Match when={user()}>
            <button onClick={logout} className="text-green-700">
              Đăng xuất
            </button>
          </Match>
          <Match when={!user()}>
            <a href="/user/register" className="text-white px-4 py-2">
              Đăng ký
            </a>
          </Match>
        </Switch>
      </li>
    </ul>
  );
};

export default AuthButton;
