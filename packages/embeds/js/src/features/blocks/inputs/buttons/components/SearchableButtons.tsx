import { Button } from '@/components/Button'
import { SearchInput } from '@/components/inputs/SearchInput'
import { InputSubmitContent } from '@/types'
import { isMobile } from '@/utils/isMobileSignal'
import type { ChoiceInputBlock } from '@typebot.io/schemas'
import { For, createSignal, onMount } from 'solid-js'

type Props = {
  inputIndex: number
  defaultItems: ChoiceInputBlock['items']
  onSubmit: (value: InputSubmitContent) => void
}

export const SearchableButtons = (props: Props) => {
  let inputRef: HTMLInputElement | undefined
  const [filteredItems, setFilteredItems] = createSignal(props.defaultItems)
  const [selectedIds, setSelectedIds] = createSignal(new Set<number>())
  onMount(() => {
    if (!isMobile() && inputRef) inputRef.focus()
  })

  // eslint-disable-next-line solid/reactivity
  const handleClick = (itemIndex: number) => () => {
    const selectedItem = filteredItems()[itemIndex]
    const newSelectedIds = new Set(selectedIds())
    newSelectedIds.add(itemIndex)
    setSelectedIds(newSelectedIds)
    props.onSubmit({
      value: selectedItem.content ?? '',
      currentBlockId: selectedItem.blockId,
    })
  }

  const filterItems = (inputValue: string) => {
    setFilteredItems(
      props.defaultItems.filter((item) =>
        item.content?.toLowerCase().includes((inputValue ?? '').toLowerCase())
      )
    )
  }

  return (
    <div class="flex flex-col gap-2 w-full">
      <div class="flex items-end typebot-input w-full">
        <SearchInput
          ref={inputRef}
          onInput={filterItems}
          placeholder="Filter the options..."
          onClear={() => setFilteredItems(props.defaultItems)}
        />
      </div>

      <div class="flex flex-wrap justify-end gap-2 overflow-y-scroll max-h-80 rounded-md hide-scrollbar">
        <For each={filteredItems()}>
          {(item, index) => (
            <span class={'relative' + (isMobile() ? ' w-full' : '')}>
              <Button
                on:click={handleClick(index())}
                data-itemid={item.id}
                class="w-full"
                variant={selectedIds().has(index()) ? undefined : 'primary'}
              >
                {item.content}
              </Button>
              {props.inputIndex === 0 && props.defaultItems.length === 1 && (
                <span class="flex h-3 w-3 absolute top-0 right-0 -mt-1 -mr-1 ping">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full brightness-200 opacity-75" />
                  <span class="relative inline-flex rounded-full h-3 w-3 brightness-150" />
                </span>
              )}
            </span>
          )}
        </For>
      </div>
    </div>
  )
}
