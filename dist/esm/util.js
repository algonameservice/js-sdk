export function generateTeal(name, escrow, app) {
    return `#pragma version 4
    byte "${name}"
    len
    int 3
    ==
    bnz main_l22
    byte "${name}"
    len
    int 4
    ==
    bnz main_l13
    byte "${name}"
    len
    int 5
    >=
    bnz main_l4
    err
    main_l4:
    gtxn 0 Amount
    int 5000000
    >=
    assert
    byte "${name}"
    len
    int 64
    <=
    assert
    int 0
    store 0
    main_l5:
    load 0
    byte "${name}"
    len
    <
    bnz main_l12
    global GroupSize
    int 2
    ==
    global GroupSize
    int 4
    ==
    ||
    assert
    gtxn 0 Sender
    gtxn 1 Sender
    ==
    assert
    gtxn 0 Receiver
    addr ${escrow}
    ==
    assert
    global GroupSize
    int 2
    ==
    bnz main_l11
    global GroupSize
    int 4
    ==
    bnz main_l10
    int 0
    return
    main_l9:
    int 1
    assert
    int 1
    b main_l31
    main_l10:
    gtxn 1 Receiver
    gtxn 2 Sender
    ==
    gtxn 2 ApplicationID
    int ${app}
    ==
    &&
    gtxn 2 OnCompletion
    int OptIn
    ==
    &&
    gtxn 3 ApplicationID
    int ${app}
    ==
    &&
    gtxn 3 Sender
    gtxn 0 Sender
    ==
    &&
    gtxna 3 ApplicationArgs 0
    byte "register_name"
    ==
    &&
    gtxna 3 ApplicationArgs 1
    byte "${name}"
    ==
    &&
    assert
    b main_l9
    main_l11:
    gtxn 1 ApplicationID
    int ${app}
    ==
    gtxna 1 ApplicationArgs 0
    byte "register_name"
    ==
    &&
    gtxna 1 ApplicationArgs 1
    byte "${name}"
    ==
    &&
    assert
    b main_l9
    main_l12:
    byte "${name}"
    load 0
    getbyte
    int 97
    >=
    byte "${name}"
    load 0
    getbyte
    int 122
    <=
    &&
    byte "${name}"
    load 0
    getbyte
    int 48
    >=
    byte "${name}"
    load 0
    getbyte
    int 57
    <=
    &&
    ||
    assert
    load 0
    int 1
    +
    store 0
    b main_l5
    main_l13:
    gtxn 0 Amount
    int 50000000
    >=
    assert
    byte "${name}"
    len
    int 64
    <=
    assert
    int 0
    store 0
    main_l14:
    load 0
    byte "${name}"
    len
    <
    bnz main_l21
    global GroupSize
    int 2
    ==
    global GroupSize
    int 4
    ==
    ||
    assert
    gtxn 0 Sender
    gtxn 1 Sender
    ==
    assert
    gtxn 0 Receiver
    addr ${escrow}
    ==
    assert
    global GroupSize
    int 2
    ==
    bnz main_l20
    global GroupSize
    int 4
    ==
    bnz main_l19
    int 0
    return
    main_l18:
    int 1
    assert
    int 1
    b main_l31
    main_l19:
    gtxn 1 Receiver
    gtxn 2 Sender
    ==
    gtxn 2 ApplicationID
    int ${app}
    ==
    &&
    gtxn 2 OnCompletion
    int OptIn
    ==
    &&
    gtxn 3 ApplicationID
    int ${app}
    ==
    &&
    gtxn 3 Sender
    gtxn 0 Sender
    ==
    &&
    gtxna 3 ApplicationArgs 0
    byte "register_name"
    ==
    &&
    gtxna 3 ApplicationArgs 1
    byte "${name}"
    ==
    &&
    assert
    b main_l18
    main_l20:
    gtxn 1 ApplicationID
    int ${app}
    ==
    gtxna 1 ApplicationArgs 0
    byte "register_name"
    ==
    &&
    gtxna 1 ApplicationArgs 1
    byte "${name}"
    ==
    &&
    assert
    b main_l18
    main_l21:
    byte "${name}"
    load 0
    getbyte
    int 97
    >=
    byte "${name}"
    load 0
    getbyte
    int 122
    <=
    &&
    byte "${name}"
    load 0
    getbyte
    int 48
    >=
    byte "${name}"
    load 0
    getbyte
    int 57
    <=
    &&
    ||
    assert
    load 0
    int 1
    +
    store 0
    b main_l14
    main_l22:
    gtxn 0 Amount
    int 150000000
    >=
    assert
    byte "${name}"
    len
    int 64
    <=
    assert
    int 0
    store 0
    main_l23:
    load 0
    byte "${name}"
    len
    <
    bnz main_l30
    global GroupSize
    int 2
    ==
    global GroupSize
    int 4
    ==
    ||
    assert
    gtxn 0 Sender
    gtxn 1 Sender
    ==
    assert
    gtxn 0 Receiver
    addr ${escrow}
    ==
    assert
    global GroupSize
    int 2
    ==
    bnz main_l29
    global GroupSize
    int 4
    ==
    bnz main_l28
    int 0
    return
    main_l27:
    int 1
    assert
    int 1
    b main_l31
    main_l28:
    gtxn 1 Receiver
    gtxn 2 Sender
    ==
    gtxn 2 ApplicationID
    int ${app}
    ==
    &&
    gtxn 2 OnCompletion
    int OptIn
    ==
    &&
    gtxn 3 ApplicationID
    int ${app}
    ==
    &&
    gtxn 3 Sender
    gtxn 0 Sender
    ==
    &&
    gtxna 3 ApplicationArgs 0
    byte "register_name"
    ==
    &&
    gtxna 3 ApplicationArgs 1
    byte "${name}"
    ==
    &&
    assert
    b main_l27
    main_l29:
    gtxn 1 ApplicationID
    int ${app}
    ==
    gtxna 1 ApplicationArgs 0
    byte "register_name"
    ==
    &&
    gtxna 1 ApplicationArgs 1
    byte "${name}"
    ==
    &&
    assert
    b main_l27
    main_l30:
    byte "${name}"
    load 0
    getbyte
    int 97
    >=
    byte "${name}"
    load 0
    getbyte
    int 122
    <=
    &&
    byte "${name}"
    load 0
    getbyte
    int 48
    >=
    byte "${name}"
    load 0
    getbyte
    int 57
    <=
    &&
    ||
    assert
    load 0
    int 1
    +
    store 0
    b main_l23
    main_l31:
    return`;
}
export function b64toString(data) {
    return Buffer.from(data, "base64").toString();
}
export function toIntArray(data) {
    return new Uint8Array(Buffer.from(data));
}
//# sourceMappingURL=util.js.map