import type { ComponentType } from 'react'
import {
  CoatHangerIcon,
  DressIcon,
  SneakerIcon,
  TShirtIcon,
  PantsIcon,
  DiamondIcon,
} from '@phosphor-icons/react'

const REC_ICON_MAP: Record<string, ComponentType<{ className?: string }>> = {
  'outfits.rec.suitJacket': CoatHangerIcon,
  'outfits.rec.jacketNoTie': CoatHangerIcon,
  'outfits.rec.darkSuit': CoatHangerIcon,
  'outfits.rec.jacketOff': CoatHangerIcon,
  'outfits.rec.casualJacket': CoatHangerIcon,
  'outfits.rec.lightShirts': TShirtIcon,
  'outfits.rec.looseShirts': TShirtIcon,
  'outfits.rec.elegantFootwear': SneakerIcon,
  'outfits.rec.elegantShoes': SneakerIcon,
  'outfits.rec.leatherSneakers': SneakerIcon,
  'outfits.rec.wedgeSandals': SneakerIcon,
  'outfits.rec.leatherShoes': SneakerIcon,
  'outfits.rec.heels': SneakerIcon,
  'outfits.rec.comfortableShoes': SneakerIcon,
  'outfits.rec.dancingShoes': SneakerIcon,
  'outfits.rec.changeShoes': SneakerIcon,
  'outfits.rec.dressOrSuit': DressIcon,
  'outfits.rec.cocktailDress': DressIcon,
  'outfits.rec.festiveDress': DressIcon,
  'outfits.rec.casualDress': DressIcon,
  'outfits.rec.dressStays': DressIcon,
  'outfits.rec.blouseSkirt': DressIcon,
  'outfits.rec.tieBow': DiamondIcon,
  'outfits.rec.hatsOptional': DiamondIcon,
  'outfits.rec.elegantAccessories': DiamondIcon,
  'outfits.rec.casualAccessories': DiamondIcon,
  'outfits.rec.jeansChinos': PantsIcon,
}

export function getOutfitRecIcon(itemKey: string): ComponentType<{ className?: string }> {
  return REC_ICON_MAP[itemKey] ?? CoatHangerIcon
}
