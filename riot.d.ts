declare namespace Riot {

  class Instance {

    version: string;
    vdom: Tag.Instance[];
    settings: { brackets: string };
    util: { tmpl: { errorHandler: (err: Error) => void } };

    /**
     * @browser
     * @server
     */
    mount(tagName: string | '*', opts?: any): Tag.Instance[];
    mount(tagSelector: string, tagName: string, opts?: any): Tag.Instance[];
    mount(domNode: Element, tagName: string, opts?: any): Tag.Instance[];

    /**
     * @server
     */
    render(tagName: string, opts?: any): string;

    /**
     * @browser
     */
    update(): Tag.Instance[];

    /**
     * @browser
     * @server
     */
    tag(tagName: string, html: string, construct?: (opts) => void): Tag.Tag;
    tag(tagName: string, html: string, css: string, construct?: (opts) => void): Tag.Tag;
    tag(tagName: string, html: string, css: string, attrs: string, construct?: (opts) => void): Tag.Tag;

    /**
     * @browser
     * @server
     */
    Tag(impl: Tag.Impl, conf: Tag.Config, innerHTML: string): Tag.Tag;

    /**
     * @browser
     */
    compile(callback: () => void): void;
    compile(url: string, callback: () => void): void;
    compile(tagHtml: string, returnString?: boolean): void | string;

    /**
     * @browser
     * @server
     */
    observable<T>(element: T): T & Observable;

    /**
     * @browser
     * @server
     */
    route: Router.Router;

    /**
     * @server
     */
    parsers: {
      css: {
        less: Parser.Css,
        sass: Parser.Css,
        scss: Parser.Css,
        stylus: Parser.Css
      } & any,
      js: {
        none: Parser.Javascript,
        javascript: Parser.Javascript,
        typescript: Parser.Javascript,
        es6: Parser.Javascript,
        babel: Parser.Javascript,
        coffee: Parser.Javascript,
        coffeescript: Parser.Javascript
      } & any,
      html: {
        jade: Parser.Html,
        pug: Parser.Html
      } & any
    };
  }

  export interface Observable {
    on<T>(events: string | '*', callback: (event?: string, ...args: any[]) => void): T;
    one<T>(event: string, callback: () => void): T;
    off<T>(events: string | '*', callbackToRemove?: () => void): T;
    trigger<T>(events: string, ...args: any[]): T;
  }

  namespace Tag {
    class Impl {
      impl: string;
      attrs: any;
      fn(opts?: any): void;
    }
    class Config {
      isLoop: boolean;
      hasImpl: boolean;
      opts: any;
      item: any;
      root: Node;
    }
    class Tag {
      impl: Impl;
      conf: Config;
      innerHTML: string;
    }
    interface Instance extends Observable {
      opts: any;
      parent?: Tag.Instance;
      root: Node;
      tags: Tag.Instance[];

      update(data?: any);
      unmount(keepParent?: boolean);
      mixin(mixinName: string): void;
      mixin(mixinObject: any): void;
      mixin(mixinName: string, mixinObject: any): void;
    }
  }

  namespace Parser {
    interface Css { (tagName: string, css: string): string; }
    interface Javascript { (js: string, opts?: any): string; }
    interface Html { (html: string): string; }
  }

  namespace Router {
    interface Route { (callback: () => void): void; }
    interface FilterRoute { (filter: string, callback: (...params: any[]) => void): void; }
    interface RouteTo { (filter: string, title?: string, replaceHistory?: boolean): void; }
    type Router = Route | FilterRoute | RouteTo | {
      create(): Router;
      start(autoExec?: boolean): void;
      stop(): void;
      exec(callback?: () => void): void;
      query(): string;
      base(path: string): void;
      parser(parser: (path: string) => string, secondParser?: (path: string, filter: string) => string);
    };
  }
}

declare var riot: Riot.Instance;

declare module "riot" {
  export = riot;
}
