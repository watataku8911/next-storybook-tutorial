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

export const Large: Story = {
  args: {
    size: "large",
  },
};

export const Small: Story = {
  args: {
    size: "small",
  },
};
