declare module "webpack" {
  type HotStatus = "idle"|"check"|"prepare"|"ready"|"dispose"|"apply"|"abort"|"fail";
  interface CheckOptions {
    ignoreUnaccepted?: boolean;
    ignoreDeclined?: boolean;
    ignoreErrored?: boolean;

    onDeclined?: (info:any) => void;
    onUnaccepted?: (info:any) => void;
    onAccepted?: (info:any) => void;
    onDisposed?: (info:any) => void;
    onErrored?: (info:any) => void;
  }

  interface Hot {
    accept(dependencies:string|string[], callback?:() => void): void;
    accept(errorHandler: (err:any) => void): void;

    decline(dependencies: string|string[]): void;
    decline(): void;

    dispose(callback: (data:any) => void): void;

    removeDisposeHandler(callback: (data:any) => void): void;

    status():HotStatus;

    check(autoApply?:boolean|CheckOptions): void;

    addStatusHander(handler: (status:HotStatus) => void): void;
    removeStatusHandler(handler: (status:HotStatus) => void): void;
  }

  global {
    interface NodeModule {
      hot?:Hot
    }
  }
}
