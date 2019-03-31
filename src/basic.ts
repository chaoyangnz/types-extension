namespace Types {
    /**
     Matches any [primitive value](https://developer.mozilla.org/en-US/docs/Glossary/Primitive).
     */
    export type Primitive =
        | null
        | undefined
        | string
        | number
        | boolean
        | symbol;

    /**
     Matches a [`class` constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes).
     */
    export type Class<T = unknown> = new(...arguments_: any[]) => T;

    /**
     Matches any [typed array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray), like `Uint8Array` or `Float64Array`.
     */
    export type TypedArray =
        | Int8Array
        | Uint8Array
        | Uint8ClampedArray
        | Int16Array
        | Uint16Array
        | Int32Array
        | Uint32Array
        | Float32Array
        | Float64Array;

    /**
     * FunctionKeys
     * @desc get union type of keys that are functions in object type `ObjectType`
     * @example
     *   type MixedProps = { name: string; setName: (name: string) => void };
     *
     *   // Expect: "setName"
     *   type FunctionKeysProps = FunctionKeys<MixedProps>;
     */
    export type FunctionKeys<ObjectType extends object> = {
        [K in keyof ObjectType]: ObjectType[K] extends Function ? K : never
    }[keyof ObjectType];

    /**
     * NonFunctionKeys
     * @desc get union type of keys that are non-functions in object type `ObjectType`
     * @example
     *   type MixedProps = { name: string; setName: (name: string) => void };
     *
     *   // Expect: "name"
     *   type NonFunctionKeysProps = NonFunctionKeys<MixedProps>;
     */
    export type NonFunctionKeys<ObjectType extends object> = {
        [K in keyof ObjectType]: ObjectType[K] extends Function ? never : K
    }[keyof ObjectType];

    /**
     * NonUndefined
     * @desc Exclude undefined from set `A`
     */
    export type NonUndefined<A> = A extends undefined ? never : A;

    /**
     * PromiseType
     * @desc Obtain Promise resolve type
     * @example
     *   // Expect: string;
     *   type Response = PromiseType<Promise<string>>;
     */
    export type PromiseResolveType<T extends Promise<any>> = T extends Promise<infer U>
        ? U
        : never;



    /**
     Allows creating a union type by combining primitive types and literal types without sacrificing auto-completion in IDEs for the literal type part of the union.
     Currently, when a union type of a primitive type is combined with literal types, TypeScript loses all information about the combined literals. Thus, when such type is used in an IDE with autocompletion, no suggestions are made for the declared literals.
     This type is a workaround for [Microsoft/TypeScript#29729](https://github.com/Microsoft/TypeScript/issues/29729). It will be removed as soon as it's not needed anymore.
     @example
     ```
     import {LiteralUnion} from 'type-fest';
     // Before
     type Pet = 'dog' | 'cat' | string;
     const pet: Pet = '';
     // Start typing in your TypeScript-enabled IDE.
     // You **will not** get auto-completion for `dog` and `cat` literals.
     // After
     type Pet2 = LiteralUnion<'dog' | 'cat', string>;
     const pet: Pet2 = '';
     // You **will** get auto-completion for `dog` and `cat` literals.
     ```
     */
    export type LiteralUnion<
        LiteralType extends BaseType,
        BaseType extends Primitive
        > = LiteralType | (BaseType & {_?: never});

}



