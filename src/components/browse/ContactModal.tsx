"use client";

import Modal from "@/components/ui/Modal";
import SocialPills from "@/components/ui/SocialLinks";
import { brand } from "@/data/portfolio";

export default function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} labelledBy="contact-title" size="md">
      <div className="relative overflow-hidden p-6 pt-12 text-center sm:p-12">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-0 h-48 w-[120%] -translate-x-1/2 rounded-full bg-brand/30 blur-3xl"
        />
        <p className="kicker relative justify-center">The Next Episode</p>
        <h2 id="contact-title" className="display relative mt-3 text-6xl text-white text-glow">
          Let&rsquo;s Build
        </h2>
        <p className="relative mx-auto mt-4 max-w-sm text-zinc-300">
          A website, a startup idea, a hackathon team or a wild idea — {brand.name} would love to hear what you&rsquo;re making.
        </p>
        <SocialPills include={["email", "linkedin", "github", "instagram"]} className="relative mt-8" />
      </div>
    </Modal>
  );
}
