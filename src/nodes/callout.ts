import { NodeSpec } from 'prosemirror-model';
import { TexFormatTypes, MdFormatSerialize } from '../serialize/types';
import { createLatexStatement } from '../serialize/tex/utils';
import { NodeGroups } from './types';

export enum CalloutKinds {
  'active' = 'active',
  'success' = 'success',
  'info' = 'info',
  'warning' = 'warning',
  'danger' = 'danger',
}

const callout: NodeSpec = {
  group: NodeGroups.top,
  content: NodeGroups.blockOrEquationOrHeading,
  attrs: {
    kind: { default: CalloutKinds.info },
  },
  toDOM(node) {
    return ['aside', { class: `callout ${node.attrs.kind}` }, 0];
  },
  parseDOM: [
    {
      tag: 'aside.callout',
      getAttrs(dom: any) {
        if (dom.classList.contains(CalloutKinds.active)) return { kind: CalloutKinds.active };
        if (dom.classList.contains(CalloutKinds.success)) return { kind: CalloutKinds.success };
        if (dom.classList.contains(CalloutKinds.info)) return { kind: CalloutKinds.info };
        if (dom.classList.contains(CalloutKinds.warning)) return { kind: CalloutKinds.warning };
        if (dom.classList.contains(CalloutKinds.danger)) return { kind: CalloutKinds.danger };
        return { kind: CalloutKinds.info };
      },
      // aside is also parsed, and this is higher priority
      priority: 60,
    },
  ],
};

export const toMarkdown: MdFormatSerialize = (state, node) => {
  state.ensureNewLine();
  const { kind } = node.attrs;
  // TODO: Translate between callout/admonition
  state.write(`\`\`\`{${kind || 'note'}}`);
  state.ensureNewLine();
  state.renderContent(node);
  state.write('```');
  state.closeBlock(node);
};

export const toTex = createLatexStatement(
  (state) => ({
    command: state.options.format === TexFormatTypes.tex_curvenote ? 'callout' : 'framed',
  }),
  (state, node) => {
    state.renderContent(node);
  },
);

export default callout;
