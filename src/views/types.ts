import { Node } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';

export type NodeViewProps = {
  node: Node;
  view: EditorView;
  getPos: () => number;
  open: boolean;
  edit: boolean;
};

export enum LanguageNames {
  Js = 'javascript',
  Jsx = 'jsx',
  Ts = 'typescript',
  Python = 'python',
  Swift = 'swift',
  Php = 'php',
  Cpp = 'text/x-c++src',
  ObjC = 'text/x-objectivec',
  Java = 'text/x-java',
  Scala = 'text/x-scala',
  C = 'text/x-csrc',
  Csharp = 'text/x-csharp',
  Julia = 'julia',
  Html = 'htmlmixed',
  R = 'r',
  Sql = 'sql',
}
