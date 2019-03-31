namespace Types {
    export type Union<UnionType1, UnionType2> = UnionType1 | UnionType2;

    /**
     * SetIntersection (same as Extract)
     * @desc Set intersection of given union types `A` and `B`
     * @example
     *   // Expect: "2" | "3"
     *   type ResultSet = Intersection<'1' | '2' | '3', '2' | '3' | '4'>;
     *
     *   // Expect: () => void
     *   type ResultSetMixed = Intersection<string | number | (() => void), Function>;
     */
    export type Intersect<UnionType1, UnionType2> = Extract<UnionType1, UnionType2>;

    /**
     * Difference (same as Exclude)
     * @desc Set difference of given union types `A` and `B`
     * @example
     *   // Expect: "1"
     *   type ResultSet = Difference<'1' | '2' | '3', '2' | '3' | '4'>;
     *
     *   // Expect: string | number
     *   type ResultSetMixed = Difference<string | number | (() => void), Function>;
     */
    export type Substract<UnionType1, UnionType2> = Exclude<UnionType1, UnionType2>;

    /**
     * Complement
     * @desc Set complement of given union types `A` and (it's subset) `A1`
     * @example
     *   // Expect: "1"
     *   type ResultSet = Complement<'1' | '2' | '3', '2' | '3'>;
     */
    export type Complement<UnionType1, UnionType2 extends UnionType1> = Substract<UnionType1, UnionType1>;

    /**
     * SymmetricDifference
     * @desc Set difference of union and intersection of given union types `A` and `B`
     * @example
     *   // Expect: "1" | "4"
     *   type ResultSet = SymmetricDifference<'1' | '2' | '3', '2' | '3' | '4'>;
     */
    export type Difference<UnionType1, UnionType2> = Substract<UnionType1 | UnionType2, UnionType1 & UnionType2>;
}
