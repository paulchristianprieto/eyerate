import React from "react";
import { AppProps } from "next/app";
import 'antd/dist/antd.css';
import "tailwindcss/tailwind.css";
import { dark, StyledThemeProvider } from "@definitions/styled-components";
import {
  Button,
  Divider,
  Menu,
  MenuItemProps,
  Select,
  Space,
  Typography,
} from 'antd';
import { ItemType } from "antd/lib/menu/hooks/useItems";
import { StarOutlined, HomeOutlined, MessageOutlined } from '@ant-design/icons'

const { Option } = Select


function MyApp({ Component, pageProps }: AppProps): JSX.Element {

  const items: ItemType[] = [
    {
      icon: <HomeOutlined />,
      label: 'Dashboard',
      key: '/dashboard'
    },
    {
      icon: <StarOutlined />,
      label: 'Online Reviews',
      key: '/reviews'
    },
    {
      icon: <MessageOutlined />,
      label: 'chat',
      key: '/chat'
    }
  ]

  return (
    <StyledThemeProvider>
      <div className="flex flex-row w-full">
        <Space
          size="middle"
          align="center"
          className="bg-darkBlue w-80 h-screen justify-start p-4"
          direction="vertical"
        >
          <img src="/images/eyerate-logo.webp" alt="logo" />
          <div className="border-t border-white border-solid w-80" />

          <Button className="rounded-full w-60 bg-lightBlue border-lightBlue ">
            <Typography className="text-white">
              SEND SMS
            </Typography>
          </Button>

          <Space direction="vertical" className="w-72">
            <Typography className="text-white">
              State
            </Typography>
            <Select defaultValue={'1'} className="w-full">
              <Option value="1">All States</Option>
              <Option value="2">arizona</Option>
            </Select>
          </Space>

          <Space direction="vertical" className="w-72">
            <Typography className="text-white">
              Current Location
            </Typography>
            <Select defaultValue={'1'} className="w-full">
              <Option value="1">All Locations</Option>
              <Option value="2">Philippines</Option>
            </Select>
          </Space>

          <Space
            direction="vertical"
            className="w-72 bg-darkBlue"
          >
            <Menu theme={'dark'} items={items} />
          </Space>
        </Space>
        
        <Component {...pageProps} />
      </div>
    </StyledThemeProvider>
  );
}

export default MyApp;
