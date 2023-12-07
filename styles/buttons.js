const base = {
    alignItems: 'center',
    justifyContent: 'center',
};
export const small = {
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: 65,
    height: 65,
};

export const rounded = {
    borderRadius: 50,
};

export const smallRounded = {
    ...base,
    ...small,
    ...rounded,
};
