type propsTocGenerate = {
  contentWrapperSelector?: string;
  tocSelector?: string | undefined;
  headingLevelFrom?: number;
  headingLevelTo?: number;
  showsHighLight?: boolean;
  showsParentHighlight?: boolean;
  viewablePercentToHighlight?: number;
};

declare function tocGenerate(props: propsTocGenerate): HTMLOListElement;

export default tocGenerate;