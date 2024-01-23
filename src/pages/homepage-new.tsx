import DeviceCardPreview from "@/components/device/device-card-preview";
import { DarkModeProps } from "@/types/dark-mode";
import { Device } from "@/types/govee";
import { theme } from "antd";
import { Lamp } from "lucide-react";
import { motion } from "framer-motion";

// Animation variants for the cards
const cardVariants = {
  hidden: { opacity: 0, x: 500 },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: index * 0.3, duration: 0.8 }, // Delay each card by 0.2s
  }),
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Component(_props: DarkModeProps) {
  const lights: Device[] = [
    {
      device: "abd",
      model: "H6003",
      deviceName: "Bed Room",
      controllable: true,
      properties: {
        colorTem: {
          range: {
            min: 2000,
            max: 9000,
          },
        },
      },
      retrievable: true,
      supportCmds: ["turn", "brightness", "color", "colorTem"],
    },
    {
      device: "dce",
      model: "H6002",
      deviceName: "Living Room",
      controllable: true,
      properties: {
        colorTem: {
          range: {
            min: 2000,
            max: 9000,
          },
        },
      },
      retrievable: true,
      supportCmds: ["turn", "brightness", "color", "colorTem"],
    },
    {
      device: "hjk",
      model: "H6002",
      deviceName: "Living Room 2",
      controllable: true,
      properties: {
        colorTem: {
          range: {
            min: 2000,
            max: 9000,
          },
        },
      },
      retrievable: true,
      supportCmds: ["turn", "brightness", "color", "colorTem"],
    },
    {
      device: "fch",
      model: "H6004",
      deviceName: "kitchen",
      controllable: true,
      properties: {
        colorTem: {
          range: {
            min: 2000,
            max: 9000,
          },
        },
      },
      retrievable: true,
      supportCmds: ["turn", "brightness", "color", "colorTem"],
    },
    {
      device: "fch",
      model: "H6004",
      deviceName: "kitchen",
      controllable: true,
      properties: {
        colorTem: {
          range: {
            min: 2000,
            max: 9000,
          },
        },
      },
      retrievable: true,
      supportCmds: ["turn", "brightness", "color", "colorTem"],
    },
  ];

  const {
    token: { colorBgLayout },
  } = theme.useToken();
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-14 flex items-center" style={{ background: colorBgLayout }}>
        <a className="flex items-center justify-center" href="/">
          <Lamp className="h-6 w-6" />
          <span className="sr-only">Govee Web Interface</span>
        </a>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <a className="text-sm font-medium hover:underline underline-offset-4" href="/">
            Home
          </a>
          <a className="text-sm font-medium hover:underline underline-offset-4" href="/dashboard">
            Devices
          </a>
          <a className="text-sm font-medium hover:underline underline-offset-4" href="/scenes">
            Scenes
          </a>
          <a className="text-sm font-medium hover:underline underline-offset-4" href="/settings">
            Settings
          </a>
        </nav>
      </header>
      <main className="flex-1">
        <motion.section className="w-full py-12 md:py-24 lg:py-56" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="container px-4 md:px-6">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Welcome to <span className="text-[#00ACE7] hover:text-[#00ACE7]"> Govee Web Interface</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 mt-4">
              Control your Govee lights from anywhere. Adjust brightness, change colors, and set scenes with ease.
            </p>
          </div>
        </motion.section>
        <section className="w-full py-6 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6 w-full">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl/none mb-8">Quick Controls</h2>
            <div className="flex flex-wrap justify-center gap-2 w-full">
              {lights.map((device, index) => (
                <motion.div
                  key={device.device}
                  custom={index} // Use the index for custom delay
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <DeviceCardPreview deviceInformations={device} loading={false} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2023 Govee Web Interface. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a className="text-xs hover:underline underline-offset-4" href="/terms">
            Terms of Service
          </a>
          <a className="text-xs hover:underline underline-offset-4" href="/privacy">
            Privacy
          </a>
        </nav>
      </footer>
    </div>
  );
}
