namespace Types {

    /**
     * PickByKey
     * @desc From `ObjectType` pick a set of properties with value type of `ValueType`.
     * @example
     *   type Props = { name: string; age: number; visible: boolean };
     *
     *   // Expect: { name: string; age: number }
     *   type RequiredProps = PickByValue<Props, string | number>;
     */
    export type PickByKey<ObjectType, KeyType extends keyof ObjectType> = Pick<ObjectType, KeyType>;

    /**
     * PickByValue
     * @desc From `ObjectType` pick a set of properties with value type of `ValueType`.
     * Credit: [Piotr Lewandowski](https://medium.com/dailyjs/typescript-create-a-condition-based-subset-types-9d902cea5b8c)
     * @example
     *   type Props = { name: string; age: number; visible: boolean };
     *
     *   // Expect: { name: string; age: number }
     *   type RequiredProps = PickByValue<Props, string | number>;
     */
    export type PickByValue<ObjectType, ValueType> = Pick<
        ObjectType,
        { [Key in keyof ObjectType]: ObjectType[Key] extends ValueType ? Key : never }[keyof ObjectType]
        >;

    /**
     * Create a type from an object type without certain keys.
     * @example
     *   import {OmitByKey} from 'type-fest';
     *   type Foo = {
     *      a: number;
     *      b: string;
     *   };
     *   type FooWithoutA = OmitByKey<Foo, 'a'>;
     *   //=> {b: string};
     */
    export type OmitByKey<ObjectType, KeyType extends keyof ObjectType> = Pick<ObjectType, Exclude<keyof ObjectType, KeyType>>;

    /**
     * OmitByValue
     * @desc From `ObjectType` remove a set of properties with value type of `ValueType`.
     * Credit: [Piotr Lewandowski](https://medium.com/dailyjs/typescript-create-a-condition-based-subset-types-9d902cea5b8c)
     * @example
     *   type Props = { name: string; age: number; visible: boolean };
     *
     *   // Expect: { visible: boolean }
     *   type RequiredProps = OmitByValue<Props, string | number>;
     */
    export type OmitByValue<ObjectType, ValueType> = Pick<
        ObjectType,
        { [Key in keyof ObjectType]: ObjectType[Key] extends ValueType ? never : Key }[keyof ObjectType]
        >;

    // TODO: inline _DeepReadonlyArray with infer in DeepReadonly, same for all other deep types
    /**
     * DeepReadonly
     * @desc Readonly that works for deeply nested structure
     * @example
     *   // Expect: {
     *   //   readonly first: {
     *   //     readonly second: {
     *   //       readonly name: string;
     *   //     };
     *   //   };
     *   // }
     *   type NestedProps = {
     *     first: {
     *       second: {
     *         name: string;
     *       };
     *     };
     *   };
     *   type ReadonlyNestedProps = DeepReadonly<NestedProps>;
     */
    export type DeepReadonly<T> = T extends (...args: any[]) => any
        ? T
        : T extends any[]
            ? _DeepReadonlyArray<T[number]>
            : T extends object
                ? _DeepReadonlyObject<T>
                : T;
    /** @private */
    // tslint:disable-next-line:class-name
    export interface _DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}
    /** @private */
    export type _DeepReadonlyObject<T> = {
        readonly [P in keyof T]: DeepReadonly<T[P]>
    };

    /**
     * DeepRequired
     * @desc Required that works for deeply nested structure
     * @example
     *   // Expect: {
     *   //   first: {
     *   //     second: {
     *   //       name: string;
     *   //     };
     *   //   };
     *   // }
     *   type NestedProps = {
     *     first?: {
     *       second?: {
     *         name?: string;
     *       };
     *     };
     *   };
     *   type RequiredNestedProps = DeepRequired<NestedProps>;
     */
    export type DeepRequired<T> = T extends (...args: any[]) => any
        ? T
        : T extends any[]
            ? _DeepRequiredArray<T[number]>
            : T extends object
                ? _DeepRequiredObject<T>
                : T;
    /** @private */
    // tslint:disable-next-line:class-name
    interface _DeepRequiredArray<T>
        extends Array<DeepRequired<NonUndefined<T>>> {}
    /** @private */
    type _DeepRequiredObject<T> = {
        [P in keyof T]-?: DeepRequired<NonUndefined<T[P]>>
    };

    /**
     * DeepNonNullable
     * @desc NonNullable that works for deeply nested structure
     * @example
     *   // Expect: {
     *   //   first: {
     *   //     second: {
     *   //       name: string;
     *   //     };
     *   //   };
     *   // }
     *   type NestedProps = {
     *     first?: null | {
     *       second?: null | {
     *         name?: string | null |
     *         undefined;
     *       };
     *     };
     *   };
     *   type RequiredNestedProps = DeepNonNullable<NestedProps>;
     */
    export type DeepNonNullable<T> = T extends (...args: any[]) => any
        ? T
        : T extends any[]
            ? _DeepNonNullableArray<T[number]>
            : T extends object
                ? _DeepNonNullableObject<T>
                : T;
    /** @private */
    // tslint:disable-next-line:class-name
    interface _DeepNonNullableArray<T>
        extends Array<DeepNonNullable<NonNullable<T>>> {}
    /** @private */
    type _DeepNonNullableObject<T> = {
        [P in keyof T]-?: DeepNonNullable<NonNullable<T[P]>>
    };

    /**
     * DeepPartial
     * @desc Partial that works for deeply nested structure
     * @example
     *   // Expect: {
     *   //   first?: {
     *   //     second?: {
     *   //       name?: string;
     *   //     };
     *   //   };
     *   // }
     *   type NestedProps = {
     *     first: {
     *       second: {
     *         name: string;
     *       };
     *     };
     *   };
     *   type PartialNestedProps = DeepPartial<NestedProps>;
     */
    export type DeepPartial<T> =
        T extends Function ? T :
            T extends Array<infer U> ? _DeepPartialArray<U> :
                T extends object ? _DeepPartialObject<T> :
                    T | undefined;
    /** @private */
    // tslint:disable-next-line:class-name
    interface _DeepPartialArray<T> extends Array<DeepPartial<T>> { }
    /** @private */
    type _DeepPartialObject<T> = {
        [P in keyof T]?: DeepPartial<T[P]>;
    };

    /**
     * Intersection
     * @desc From `ObjectType` pick properties that exist in `U`
     * @example
     *   type Props = { name: string; age: number; visible: boolean };
     *   type DefaultProps = { age: number };
     *
     *   // Expect: { age: number; }
     *   type DuplicatedProps = Intersection<Props, DefaultProps>;
     */
    export type ObjectIntersect<T extends object, U extends object> = T extends any
        ? Pick<T, Intersect<keyof T, keyof U>>
        : never;

    /**
     * ObjectSubtract
     * @desc From `ObjectType` remove properties that exist in `U`
     * @example
     *   type Props = { name: string; age: number; visible: boolean };
     *   type DefaultProps = { age: number };
     *
     *   // Expect: { name: string; visible: boolean; }
     *   type RequiredProps = ObjectSubtract<Props, DefaultProps>;
     */
    export type ObjectSubtract<T extends object, U extends object> = Pick<
        T,
        Substract<keyof T, keyof U>
        >;

    /**
     * Subtract
     * @desc From `ObjectType` remove properties that exist in `T1` (`T1` is a subtype of `ObjectType`)
     * @example
     *   type Props = { name: string; age: number; visible: boolean };
     *   type DefaultProps = { age: number };
     *
     *   // Expect: { name: string; visible: boolean; }
     *   type RequiredProps = Subtract<Props, DefaultProps>;
     */
    export type ObjectComplement<T extends T1, T1 extends object> = Pick<
        T,
        Complement<keyof T, keyof T1>
        >;

    /**
     * Overwrite
     * @desc From `U` overwrite properties to `ObjectType`
     * @example
     *   type Props = { name: string; age: number; visible: boolean };
     *   type NewProps = { age: string; other: string };
     *
     *   // Expect: { name: string; age: string; visible: boolean; }
     *   type ReplacedProps = Overwrite<Props, NewProps>;
     */
    export type MergeOverride<
        T extends object,
        U extends object,
        I = ObjectSubtract<T, U> & Intersect<U, T>
        > = Pick<I, keyof I>;


    /**
     * Merge
     * @desc From `U` assign properties to `ObjectType` (just like object assign)
     * @example
     *   type Props = { name: string; age: number; visible: boolean };
     *   type NewProps = { age: string; other: string };
     *
     *   // Expect: { name: string; age: number; visible: boolean; other: string; }
     *   type ExtendedProps = Merge<Props, NewProps>;
     */
    export type Merge<
        T extends object,
        U extends object,
        I = ObjectSubtract<T, U> & Intersect<U, T> & ObjectSubtract<U, T>
        > = Pick<I, keyof I>;

    // Helper type. Not useful on its own.
    type _Without<FirstType, SecondType> = {[KeyType in Exclude<keyof FirstType, keyof SecondType>]?: never};

    /**
     Create a type that has mutually exclusive properties.
     This type was inspired by [this comment](https://github.com/Microsoft/TypeScript/issues/14094#issuecomment-373782604).
     This type works with a helper type, called `Without`. `Without<FirstType, SecondType>` produces a type that has only keys from `FirstType` which are not present on `SecondType` and sets the value type for these keys to `never`. This helper type is then used in `MergeExclusive` to remove keys from either `FirstType` or `SecondType`.
     @example
     ```
     import {MergeExclusive} from 'type-fest';
     interface ExclusiveVariation1 {
        exclusive1: boolean;
    }
     interface ExclusiveVariation2 {
        exclusive2: string;
    }
     type ExclusiveOptions = MergeExclusive<ExclusiveVariation1, ExclusiveVariation2>;
     let exclusiveOptions: ExclusiveOptions;
     exclusiveOptions = {exclusive1: true};
     //=> Works
     exclusiveOptions = {exclusive2: 'hi'};
     //=> Works
     exclusiveOptions = {exclusive1: true, exclusive2: 'hi'};
     //=> Error
     ```
     */
    export type MergeExclusive<FirstType, SecondType> =
        (FirstType | SecondType) extends object ?
            (_Without<FirstType, SecondType> & SecondType) | (_Without<SecondType, FirstType> & FirstType) :
            FirstType | SecondType;
}
