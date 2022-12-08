import { Tool } from 'contentlayer/generated'
import { TreeNode } from 'types/TreeNode'

export const buildToolsTree = (tools: Tool[], parentPathNames: string[] = []): TreeNode[] => {
  const level = parentPathNames.length

  return tools
    .filter(
      (_) =>
        _.pathSegments.length === level + 1 &&
        _.pathSegments
          .map((_: PathSegment) => _.pathName)
          .join('/')
          .startsWith(parentPathNames.join('/')),
    )
    .sort((a, b) => a.pathSegments[level].order - b.pathSegments[level].order)
    .map<TreeNode>((tool) => ({
      nav_title: tool.nav_title ?? null,
      title: tool.title,
      label: tool.label ?? null,
      excerpt: tool.excerpt ?? null,
      urlPath: '/' + tool.pathSegments.map((_: PathSegment) => _.pathName).join('/'),
      collapsible: tool.collapsible ?? null,
      collapsed: tool.collapsed ?? null,
      children: buildToolsTree(
        tools,
        tool.pathSegments.map((_: PathSegment) => _.pathName),
      ),
    }))
}
