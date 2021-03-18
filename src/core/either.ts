export interface Left<E> {
  readonly _type: "left";
  readonly left: E;
}

export interface Right<A> {
  readonly _type: "right";
  readonly right: A;
}

export type Either<E, A> = Left<E> | Right<A>;

export const isLeft = <E, A>(ma: Either<E, A>): ma is Left<E> =>
  ma._type === "left";

export const isRight = <E, A>(ma: Either<E, A>): ma is Right<A> =>
  ma._type === "right";

export const valueOf = <E, A>(e: Either<E, A>): E | A =>
  isRight(e) ? e.right : e.left;

export const left = <E, A>(l: E): Either<E, A> => {
  return {
    _type: "left",
    left: l,
  };
};

export const right = <E, A>(a: A): Either<E, A> => {
  return {
    _type: "right",
    right: a,
  };
};

export const map = <A, B>(fn: (a: A) => B) => <E>(
  fa: Either<E, A>
): Either<E, B> => (isRight(fa) ? right(fn(fa.right)) : left(fa.left));

export const mapLeft = <E, G>(f: (e: E) => G) => <A>(
  fa: Either<E, A>
): Either<G, A> => (isLeft(fa) ? left(f(fa.left)) : right(fa.right));
