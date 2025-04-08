// This file is auto-generated by @hey-api/openapi-ts

import { type Options, readItems, createItem, deleteItem, readItem, updateItem, loginAccessToken, testToken, recoverPassword, resetPassword, recoverPasswordHtmlContent, testEmail, healthCheck, readUsers, createUser, deleteUserMe, readUserMe, updateUserMe, updatePasswordMe, registerUser, deleteUser, readUserById, updateUser, privateCreateUser } from '../sdk.gen';
import { queryOptions, type UseMutationOptions, type DefaultError } from '@tanstack/react-query';
import type { ItemsReadItemsData, ItemsCreateItemData, ItemsCreateItemError, ItemsCreateItemResponse, ItemsDeleteItemData, ItemsDeleteItemError, ItemsDeleteItemResponse, ItemsReadItemData, ItemsUpdateItemData, ItemsUpdateItemError, ItemsUpdateItemResponse, LoginLoginAccessTokenData, LoginLoginAccessTokenError, LoginLoginAccessTokenResponse, LoginTestTokenData, LoginTestTokenResponse, LoginRecoverPasswordData, LoginRecoverPasswordError, LoginRecoverPasswordResponse, LoginResetPasswordData, LoginResetPasswordError, LoginResetPasswordResponse, LoginRecoverPasswordHtmlContentData, LoginRecoverPasswordHtmlContentError, LoginRecoverPasswordHtmlContentResponse, UtilsTestEmailData, UtilsTestEmailError, UtilsTestEmailResponse, UtilsHealthCheckData, UsersReadUsersData, UsersCreateUserData, UsersCreateUserError, UsersCreateUserResponse, UsersDeleteUserMeData, UsersDeleteUserMeResponse, UsersReadUserMeData, UsersUpdateUserMeData, UsersUpdateUserMeError, UsersUpdateUserMeResponse, UsersUpdatePasswordMeData, UsersUpdatePasswordMeError, UsersUpdatePasswordMeResponse, UsersRegisterUserData, UsersRegisterUserError, UsersRegisterUserResponse, UsersDeleteUserData, UsersDeleteUserError, UsersDeleteUserResponse, UsersReadUserByIdData, UsersUpdateUserData, UsersUpdateUserError, UsersUpdateUserResponse, PrivateCreateUserData, PrivateCreateUserError, PrivateCreateUserResponse } from '../types.gen';
import { client as _heyApiClient } from '../client.gen';

export type QueryKey<TOptions extends Options> = [
    Pick<TOptions, 'baseUrl' | 'body' | 'headers' | 'path' | 'query'> & {
        _id: string;
        _infinite?: boolean;
    }
];

const createQueryKey = <TOptions extends Options>(id: string, options?: TOptions, infinite?: boolean): [
    QueryKey<TOptions>[0]
] => {
    const params: QueryKey<TOptions>[0] = { _id: id, baseUrl: (options?.client ?? _heyApiClient).getConfig().baseUrl } as QueryKey<TOptions>[0];
    if (infinite) {
        params._infinite = infinite;
    }
    if (options?.body) {
        params.body = options.body;
    }
    if (options?.headers) {
        params.headers = options.headers;
    }
    if (options?.path) {
        params.path = options.path;
    }
    if (options?.query) {
        params.query = options.query;
    }
    return [
        params
    ];
};

export const readItemsQueryKey = (options?: Options<ItemsReadItemsData>) => createQueryKey('itemsReadItems', options);

export const readItemsOptions = (options?: Options<ItemsReadItemsData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await readItems({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: readItemsQueryKey(options)
    });
};

export const createItemQueryKey = (options: Options<ItemsCreateItemData>) => createQueryKey('itemsCreateItem', options);

export const createItemOptions = (options: Options<ItemsCreateItemData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await createItem({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: createItemQueryKey(options)
    });
};

export const createItemMutation = (options?: Partial<Options<ItemsCreateItemData>>) => {
    const mutationOptions: UseMutationOptions<ItemsCreateItemResponse, ItemsCreateItemError, Options<ItemsCreateItemData>> = {
        mutationFn: async (localOptions) => {
            const { data } = await createItem({
                ...options,
                ...localOptions,
                throwOnError: true
            });
            return data;
        }
    };
    return mutationOptions;
};

export const deleteItemMutation = (options?: Partial<Options<ItemsDeleteItemData>>) => {
    const mutationOptions: UseMutationOptions<ItemsDeleteItemResponse, ItemsDeleteItemError, Options<ItemsDeleteItemData>> = {
        mutationFn: async (localOptions) => {
            const { data } = await deleteItem({
                ...options,
                ...localOptions,
                throwOnError: true
            });
            return data;
        }
    };
    return mutationOptions;
};

export const readItemQueryKey = (options: Options<ItemsReadItemData>) => createQueryKey('itemsReadItem', options);

export const readItemOptions = (options: Options<ItemsReadItemData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await readItem({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: readItemQueryKey(options)
    });
};

export const updateItemMutation = (options?: Partial<Options<ItemsUpdateItemData>>) => {
    const mutationOptions: UseMutationOptions<ItemsUpdateItemResponse, ItemsUpdateItemError, Options<ItemsUpdateItemData>> = {
        mutationFn: async (localOptions) => {
            const { data } = await updateItem({
                ...options,
                ...localOptions,
                throwOnError: true
            });
            return data;
        }
    };
    return mutationOptions;
};

export const loginAccessTokenQueryKey = (options: Options<LoginLoginAccessTokenData>) => createQueryKey('loginLoginAccessToken', options);

export const loginAccessTokenOptions = (options: Options<LoginLoginAccessTokenData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await loginAccessToken({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: loginAccessTokenQueryKey(options)
    });
};

export const loginAccessTokenMutation = (options?: Partial<Options<LoginLoginAccessTokenData>>) => {
    const mutationOptions: UseMutationOptions<LoginLoginAccessTokenResponse, LoginLoginAccessTokenError, Options<LoginLoginAccessTokenData>> = {
        mutationFn: async (localOptions) => {
            const { data } = await loginAccessToken({
                ...options,
                ...localOptions,
                throwOnError: true
            });
            return data;
        }
    };
    return mutationOptions;
};

export const testTokenQueryKey = (options?: Options<LoginTestTokenData>) => createQueryKey('loginTestToken', options);

export const testTokenOptions = (options?: Options<LoginTestTokenData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await testToken({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: testTokenQueryKey(options)
    });
};

export const testTokenMutation = (options?: Partial<Options<LoginTestTokenData>>) => {
    const mutationOptions: UseMutationOptions<LoginTestTokenResponse, DefaultError, Options<LoginTestTokenData>> = {
        mutationFn: async (localOptions) => {
            const { data } = await testToken({
                ...options,
                ...localOptions,
                throwOnError: true
            });
            return data;
        }
    };
    return mutationOptions;
};

export const recoverPasswordQueryKey = (options: Options<LoginRecoverPasswordData>) => createQueryKey('loginRecoverPassword', options);

export const recoverPasswordOptions = (options: Options<LoginRecoverPasswordData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await recoverPassword({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: recoverPasswordQueryKey(options)
    });
};

export const recoverPasswordMutation = (options?: Partial<Options<LoginRecoverPasswordData>>) => {
    const mutationOptions: UseMutationOptions<LoginRecoverPasswordResponse, LoginRecoverPasswordError, Options<LoginRecoverPasswordData>> = {
        mutationFn: async (localOptions) => {
            const { data } = await recoverPassword({
                ...options,
                ...localOptions,
                throwOnError: true
            });
            return data;
        }
    };
    return mutationOptions;
};

export const resetPasswordQueryKey = (options: Options<LoginResetPasswordData>) => createQueryKey('loginResetPassword', options);

export const resetPasswordOptions = (options: Options<LoginResetPasswordData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await resetPassword({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: resetPasswordQueryKey(options)
    });
};

export const resetPasswordMutation = (options?: Partial<Options<LoginResetPasswordData>>) => {
    const mutationOptions: UseMutationOptions<LoginResetPasswordResponse, LoginResetPasswordError, Options<LoginResetPasswordData>> = {
        mutationFn: async (localOptions) => {
            const { data } = await resetPassword({
                ...options,
                ...localOptions,
                throwOnError: true
            });
            return data;
        }
    };
    return mutationOptions;
};

export const recoverPasswordHtmlContentQueryKey = (options: Options<LoginRecoverPasswordHtmlContentData>) => createQueryKey('loginRecoverPasswordHtmlContent', options);

export const recoverPasswordHtmlContentOptions = (options: Options<LoginRecoverPasswordHtmlContentData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await recoverPasswordHtmlContent({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: recoverPasswordHtmlContentQueryKey(options)
    });
};

export const recoverPasswordHtmlContentMutation = (options?: Partial<Options<LoginRecoverPasswordHtmlContentData>>) => {
    const mutationOptions: UseMutationOptions<LoginRecoverPasswordHtmlContentResponse, LoginRecoverPasswordHtmlContentError, Options<LoginRecoverPasswordHtmlContentData>> = {
        mutationFn: async (localOptions) => {
            const { data } = await recoverPasswordHtmlContent({
                ...options,
                ...localOptions,
                throwOnError: true
            });
            return data;
        }
    };
    return mutationOptions;
};

export const testEmailQueryKey = (options: Options<UtilsTestEmailData>) => createQueryKey('utilsTestEmail', options);

export const testEmailOptions = (options: Options<UtilsTestEmailData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await testEmail({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: testEmailQueryKey(options)
    });
};

export const testEmailMutation = (options?: Partial<Options<UtilsTestEmailData>>) => {
    const mutationOptions: UseMutationOptions<UtilsTestEmailResponse, UtilsTestEmailError, Options<UtilsTestEmailData>> = {
        mutationFn: async (localOptions) => {
            const { data } = await testEmail({
                ...options,
                ...localOptions,
                throwOnError: true
            });
            return data;
        }
    };
    return mutationOptions;
};

export const healthCheckQueryKey = (options?: Options<UtilsHealthCheckData>) => createQueryKey('utilsHealthCheck', options);

export const healthCheckOptions = (options?: Options<UtilsHealthCheckData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await healthCheck({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: healthCheckQueryKey(options)
    });
};

export const readUsersQueryKey = (options?: Options<UsersReadUsersData>) => createQueryKey('usersReadUsers', options);

export const readUsersOptions = (options?: Options<UsersReadUsersData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await readUsers({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: readUsersQueryKey(options)
    });
};

export const createUserQueryKey = (options: Options<UsersCreateUserData>) => createQueryKey('usersCreateUser', options);

export const createUserOptions = (options: Options<UsersCreateUserData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await createUser({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: createUserQueryKey(options)
    });
};

export const createUserMutation = (options?: Partial<Options<UsersCreateUserData>>) => {
    const mutationOptions: UseMutationOptions<UsersCreateUserResponse, UsersCreateUserError, Options<UsersCreateUserData>> = {
        mutationFn: async (localOptions) => {
            const { data } = await createUser({
                ...options,
                ...localOptions,
                throwOnError: true
            });
            return data;
        }
    };
    return mutationOptions;
};

export const deleteUserMeMutation = (options?: Partial<Options<UsersDeleteUserMeData>>) => {
    const mutationOptions: UseMutationOptions<UsersDeleteUserMeResponse, DefaultError, Options<UsersDeleteUserMeData>> = {
        mutationFn: async (localOptions) => {
            const { data } = await deleteUserMe({
                ...options,
                ...localOptions,
                throwOnError: true
            });
            return data;
        }
    };
    return mutationOptions;
};

export const readUserMeQueryKey = (options?: Options<UsersReadUserMeData>) => createQueryKey('usersReadUserMe', options);

export const readUserMeOptions = (options?: Options<UsersReadUserMeData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await readUserMe({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: readUserMeQueryKey(options)
    });
};

export const updateUserMeMutation = (options?: Partial<Options<UsersUpdateUserMeData>>) => {
    const mutationOptions: UseMutationOptions<UsersUpdateUserMeResponse, UsersUpdateUserMeError, Options<UsersUpdateUserMeData>> = {
        mutationFn: async (localOptions) => {
            const { data } = await updateUserMe({
                ...options,
                ...localOptions,
                throwOnError: true
            });
            return data;
        }
    };
    return mutationOptions;
};

export const updatePasswordMeMutation = (options?: Partial<Options<UsersUpdatePasswordMeData>>) => {
    const mutationOptions: UseMutationOptions<UsersUpdatePasswordMeResponse, UsersUpdatePasswordMeError, Options<UsersUpdatePasswordMeData>> = {
        mutationFn: async (localOptions) => {
            const { data } = await updatePasswordMe({
                ...options,
                ...localOptions,
                throwOnError: true
            });
            return data;
        }
    };
    return mutationOptions;
};

export const registerUserQueryKey = (options: Options<UsersRegisterUserData>) => createQueryKey('usersRegisterUser', options);

export const registerUserOptions = (options: Options<UsersRegisterUserData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await registerUser({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: registerUserQueryKey(options)
    });
};

export const registerUserMutation = (options?: Partial<Options<UsersRegisterUserData>>) => {
    const mutationOptions: UseMutationOptions<UsersRegisterUserResponse, UsersRegisterUserError, Options<UsersRegisterUserData>> = {
        mutationFn: async (localOptions) => {
            const { data } = await registerUser({
                ...options,
                ...localOptions,
                throwOnError: true
            });
            return data;
        }
    };
    return mutationOptions;
};

export const deleteUserMutation = (options?: Partial<Options<UsersDeleteUserData>>) => {
    const mutationOptions: UseMutationOptions<UsersDeleteUserResponse, UsersDeleteUserError, Options<UsersDeleteUserData>> = {
        mutationFn: async (localOptions) => {
            const { data } = await deleteUser({
                ...options,
                ...localOptions,
                throwOnError: true
            });
            return data;
        }
    };
    return mutationOptions;
};

export const readUserByIdQueryKey = (options: Options<UsersReadUserByIdData>) => createQueryKey('usersReadUserById', options);

export const readUserByIdOptions = (options: Options<UsersReadUserByIdData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await readUserById({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: readUserByIdQueryKey(options)
    });
};

export const updateUserMutation = (options?: Partial<Options<UsersUpdateUserData>>) => {
    const mutationOptions: UseMutationOptions<UsersUpdateUserResponse, UsersUpdateUserError, Options<UsersUpdateUserData>> = {
        mutationFn: async (localOptions) => {
            const { data } = await updateUser({
                ...options,
                ...localOptions,
                throwOnError: true
            });
            return data;
        }
    };
    return mutationOptions;
};

export const privateCreateUserQueryKey = (options: Options<PrivateCreateUserData>) => createQueryKey('privateCreateUser', options);

export const privateCreateUserOptions = (options: Options<PrivateCreateUserData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await privateCreateUser({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: privateCreateUserQueryKey(options)
    });
};

export const privateCreateUserMutation = (options?: Partial<Options<PrivateCreateUserData>>) => {
    const mutationOptions: UseMutationOptions<PrivateCreateUserResponse, PrivateCreateUserError, Options<PrivateCreateUserData>> = {
        mutationFn: async (localOptions) => {
            const { data } = await privateCreateUser({
                ...options,
                ...localOptions,
                throwOnError: true
            });
            return data;
        }
    };
    return mutationOptions;
};