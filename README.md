## storybook の導入

```console
$ npx storybook init
```

実行後、ルートディレクトリに`.storybook`ディレクトリ、`src/stories`ディレクトリとその中にサンプルファイルが自動的に生成され、`package.json`ファイルもnpmコマンドなどが追記されていると思います。

```console
$ npm run storybook
```

storybookを立ち上げるコマンド。

## 基本的なstoryの書き方

`.storybook/.main.ts`ファイルがStorybookの設定ファイルです。そこに以下のパスを追加します

```ts
import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@/components/**/*.stories.@(js|jsx|ts|tsx)", // 追加
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  staticDirs: ["../public"],
};
export default config;
```

デフォルトでは`stories`ディレクトリからストーリファイルを読み込む設定になっていますが、`components`ディレクトリからストリーファイルを読み込むように設定したいから追加した

## コンポーネントをカタログに登録する

今回カタログに登録するコンポーネント

```tsx
// components/Circle/Circle.tsx

import React from "react";

type Props = {
  variant: "green" | "yellow" | "orange";
};

const Circle = ({ variant = "orange" }: Props) => {
  let bgColor;

  switch (variant) {
    case "orange":
      bgColor = "bg-orange-500";
      break;
    case "yellow":
      bgColor = "bg-yellow-500";
      break;
    case "green":
      bgColor = "bg-green-500";
      break;
    default:
      bgColor = "bg-orange-500";
  }

  return <div className={`${bgColor} w-14 h-14 p-2 rounded-full`}></div>;
};

export default Circle;
```

このコンポーネントをカタログに追加するために`components/Circle/Circle.stories.ts`ファイルを作成します。

```ts
// components/Circle/Circle.stories.ts

import { Meta, StoryObj } from "@storybook/react";
import Circle from "./Circle";

const meta: Meta<typeof Circle> = {
  component: Circle,
  title: "Circle",

  // variantの切り替え方法(デフォルトではラジオボタン)
  argTypes: {
    variant: {
      control: "select",
    },
  },

  // ドキュメントの追加
  tags: ["autodocs"],
};

export default meta;

// 実際にカタログに登録する
type Story = StoryObj<typeof meta>;

export const BaseCircle: Story = {
  args: {
    variant: "orange",
  },
};

export const GreenCircle: Story = {
  args: {
    variant: "green",
  },
};

export const YellowGreen: Story = {
  args: {
    variant: "yellow",
  },
};
```

完了です。

しかしながらTailwindCSSを使っている場合は以下の設定を追加してください

```ts
// .storybook/preview.ts

import type { Preview } from "@storybook/react";
import "../src/app/globals.css"; // 追加

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
```
