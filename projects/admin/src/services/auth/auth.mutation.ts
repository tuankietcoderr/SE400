import {useMutation} from '@tanstack/react-query';
import {loginUserAction, logoutUserAction} from './auth.action';
import {LoginRequestDto} from './auth.dto';

export const useLoginUserMutation = () => {
  return useMutation({
    mutationFn: async (payload: LoginRequestDto) => {
      return await loginUserAction(payload);
    },
  });
};

export const useLogoutUserMutation = () => {
  return useMutation({
    mutationFn: async () => {
      return await logoutUserAction();
    },
  });
};
