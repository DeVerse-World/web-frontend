export class Result<T> {
    success: boolean;
    value?: T;
    error?: Error;

    constructor(isSuccess: boolean, error?: Error, value?: T) {
        this.success = isSuccess;
        this.value = value;
        this.error = error;
    }

    isSuccess(): boolean {
        return this.success;
    }

    isFailure(): boolean {
        return !this.success;
    }

    getValue(): T {
        return this.value;
    }

    getError(): Error {
        return this.error;
    }
}

export class Success<T> extends Result<T> {
    constructor(value?: T) {
        super(true, null, value);
    }
}

export class Failure extends Result<never> {
    constructor(error: Error) {
        super(false, error);
    }
}