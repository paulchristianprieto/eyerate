import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Input,
  Menu,
  Row,
  Select,
  Space,
  Typography,
} from 'antd';
import moment from "moment";
import { ExclamationCircleFilled } from '@ant-design/icons'
import { last, findIndex, isEmpty } from 'lodash-es'

import messagesInitial from '../src/messages'

const { Option } = Select

import { Container } from "@components";

type MessageContent = {
  sentAt: string,
  content: string,
  sender: string,
  isRead: Boolean,
}

type Message = {
  id?: string,
  name?: string,
  icon?: string,
  messages: Array<MessageContent>
}

type ChatProps = {
  messages: Message[]
}

const Home: React.FC<ChatProps> = ({ messages }) => {
  const [inputMessage, setInputMessage] = useState<string>('')
  const [stateMessages, setStateMessages] = useState<Message[]>(messages)
  const [user, setUser] = useState<Message>()

  const [chatMessages, setChatMessages] = useState<MessageContent[]>([])

  const handleSendMessage = (value: string) => {
    const userMessageObject = stateMessages.find(a => a.id === user?.id)
    const newUserMessageObject = {
      ...userMessageObject,
      messages: [...userMessageObject?.messages ?? [], {
        sentAt: moment().format('lll'),
        content: value,
        sender: 'self',
        isRead: true,
      }]
    }
    const newMessages = stateMessages.map(a => {
      return a.id === user?.id ? newUserMessageObject : a
    })
    setStateMessages(newMessages)
    setInputMessage('')
  }

  const handleSeen = () => {
    const userMessageObject = stateMessages.find(a => a.id === user?.id)

    const newUserMessageObject = {
      ...userMessageObject,
      messages: [
        ...userMessageObject?.messages.splice(-1) ?? [],
        {
          ...last(userMessageObject?.messages),
          isRead: true
        }
      ]
    }
    const newMessages = stateMessages.map(a => {
      return a.id === user?.id ? newUserMessageObject : a
    })
    setStateMessages(newMessages)
    setInputMessage('')
  }


  useEffect(() => {
    const stateMessage = stateMessages.find(a => a.id === user?.id)
    setChatMessages(stateMessage?.messages ?? [])
  }, [stateMessages, user])

  useEffect(() => {
    // handleSeen()
  }, [user])

  return (
    <div className="w-full flex flex-1 overflow-y-hidden">
      <Space size={0}>
        <Space
          size="middle"
          align="center"
          className="bg-darkBlue-70 w-80 h-screen justify-start p-4"
          direction="vertical"
        >
          {stateMessages.map((message: Message) => {
            return (
              <Space
                key={message.id}
                direction="vertical"
                className="w-72 cursor-pointer"
                onClick={() => {
                  setChatMessages(message.messages)
                  setUser(message)
                }}
              >
                <Space className="w-full justify-between">
                  <Space align="center">
                    <Typography className="font-bold text-white">
                      {message.name}
                    </Typography>
                    <Typography className="text-red ">
                      {!last(message.messages).isRead && <ExclamationCircleFilled />}
                    </Typography>
                  </Space>
                  <Typography className="text-white">
                    {`${moment().diff(moment(last(message.messages).sentAt), 'days')} days`}
                  </Typography>
                </Space>
                <Typography.Paragraph
                  className="text-white text-xs"
                  ellipsis={true}
                >
                  {last(message.messages).content}
                </Typography.Paragraph>
              </Space>
            )
          })}
        </Space>
      </Space>
      {!isEmpty(chatMessages) && (
        <div className="w-full h-full flex flex-col justify-between overflow-y-hidden ">
          <Space
            direction="vertical"
            className="bg-darkBlue-90 w-full h-full overflow-y-scroll"
            size={12}
          >
            <div className="bg-white p-4">
              <Typography.Title level={4}>
                @{user?.id}
              </Typography.Title>
            </div>

            <Space direction="vertical" className="p-8 w-full" size="large">
              {chatMessages.map((chatMessage) => {
                return (
                  <div
                    key={chatMessage.sentAt}
                    className={`${chatMessage.sender !== 'self' ? "text-left" : "text-right"}`}
                  >
                    <Space align="center">
                      {chatMessage.sender !== 'self' &&
                        <img
                          style={{
                            width: 60,
                            height: 60,
                            minWidth: 60
                          }}
                          className="rounded-full"
                          src={chatMessage.sender === 'self' ? "/images/cat.png" : user?.icon}
                        />
                      }
                      <Space direction="vertical">
                        <Typography className="text-xs">
                          {moment(chatMessage.sentAt).format('lll')}
                        </Typography>

                        <div className="bg-white p-4 rounded-xl shadow-md">
                          <Typography.Paragraph className="text-xs">
                            {chatMessage.content}
                          </Typography.Paragraph>
                        </div>
                      </Space>

                      {chatMessage.sender === 'self' &&
                        <img
                          style={{
                            width: 60,
                            height: 60,
                            minWidth: 60
                          }}
                          className="rounded-full"
                          src={chatMessage.sender === 'self' ? "/images/cat.png" : user?.icon}
                        />
                      }
                    </Space>
                  </div>
                )
              })}
            </Space>
          </Space>
          <div className="p-4">
            <Input
              placeholder={`Message @${user?.id}`}
              onPressEnter={(e: any) => {
                handleSendMessage(e.target.value)
              }}
              value={inputMessage}
              onChange={(e: any) => setInputMessage(e.target.value)}
            />
          </div>
        </div>
      )
      }
    </div >
  );
};

export async function getStaticProps() {
  return {
    props: {
      messages: messagesInitial
    },
  }
}

export default Home;
