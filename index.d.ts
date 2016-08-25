declare namespace riot {
  var version: string;
  var vdom: Tag.Instance[];
  var settings: { brackets: string };
  var util: { tmpl: { errorHandler: (err: Error) => void } };

  /**
   * @browser
   * @server
   */
  function mount(tagName: string | '*', opts?: any): Tag.Instance[];
  function mount(tagSelector: string, tagName: string, opts?: any): Tag.Instance[];
  function mount(domNode: Element, tagName: string, opts?: any): Tag.Instance[];

  /**
   * @server
   */
  function render(tagName: string, opts?: any): string;

  /**
   * @browser
   */
  function update(): Tag.Instance[];

  /**
   * @browser
   * @server
   */
  function tag(tagName: string, html: string, construct?: (opts: any) => void): Tag;
  function tag(tagName: string, html: string, css: string, construct?: (opts: any) => void): Tag;
  function tag(tagName: string, html: string, css: string, attrs: string, construct?: (opts: any) => void): Tag;

  /**
   * @browser
   * @server
   */
  class Tag {
    constructor(impl: Tag.Impl, conf: Tag.Config, innerHTML: string);
    impl: Tag.Impl;
    conf: Tag.Config;
    innerHTML: string;
  }

  /**
   * @browser
   */
  function compile(callback: () => void): void;
  function compile(url: string, callback: () => void): void;
  function compile(tagHtml: string, returnString?: boolean): void | string;

  /**
   * @browser
   * @server
   */
  function mixin(...mixinObject: any[]): void;
  function mixin(mixinName: string, mixinObject: any): void;
  function mixin(mixinName: string, mixinObject: any, global: boolean): void;

  /**
   * @browser
   * @server
   */
  function observable<T>(element: T): T & Observable;

  /**
   * @browser
   * @server
   */
  var route: Router;

  /**
   * @server
   */
  var parsers: {
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

  interface Observable {
    on<T>(events: string | '*', callback: (event?: string, ...args: any[]) => void): T;
    one<T>(event: string, callback: () => void): T;
    off<T>(events: string | '*', callbackToRemove?: () => void): T;
    trigger<T>(events: string, ...args: any[]): T;
  }

  interface TagElement extends HTMLElement {
    _tag: Tag.Instance;
  }

  namespace Tag {
    interface Impl {
      impl: string;
      attrs: any;
      fn(opts?: any): void;
    }
    interface Config {
      isLoop: boolean;
      hasImpl: boolean;
      opts: any;
      item: any;
      root: TagElement;
    }
    interface Instance extends Observable {
      opts: any;
      parent?: Tag.Instance;
      root: TagElement;
      tags: Tag.Instance[];

      update(data?: any): void;
      unmount(keepParent?: boolean): void;
      mixin(...mixinObject: any[]): void;
      mixin(mixinName: string): void;
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
  }

  interface Router extends Router.Route, Router.FilterRoute, Router.RouteTo {
    create(): Router;
    start(autoExec?: boolean): void;
    stop(): void;
    exec(callback?: () => void): void;
    query(): string;
    base(path: string): void;
    parser(parser: (path: string) => string, secondParser?: (path: string, filter: string) => string): void;
  }
}

export = riot;
