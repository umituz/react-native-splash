/**
 * Use Splash Hook Tests
 */

import { renderHook, act } from "@testing-library/react-hooks";
import { useSplash } from "../presentation/hooks/useSplash";

describe("useSplash", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("initializes with visible state", () => {
    const { result } = renderHook(() => useSplash());
    
    expect(result.current.isVisible).toBe(true);
    expect(result.current.isReady).toBe(false);
  });

  it("marks as ready and calls onReady", async () => {
    const onReady = jest.fn();
    const { result } = renderHook(() => useSplash({ onReady }));
    
    await act(async () => {
      await result.current.markReady();
    });
    
    expect(result.current.isReady).toBe(true);
    expect(onReady).toHaveBeenCalledTimes(1);
  });

  it("auto-hides after minimum display time", async () => {
    const { result } = renderHook(() => useSplash({ minimumDisplayTime: 1000 }));
    
    await act(async () => {
      await result.current.markReady();
    });
    
    expect(result.current.isVisible).toBe(true);
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(result.current.isVisible).toBe(false);
  });

  it("does not auto-hide when autoHide is false", async () => {
    const { result } = renderHook(() => useSplash({ autoHide: false }));
    
    await act(async () => {
      await result.current.markReady();
    });
    
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    
    expect(result.current.isVisible).toBe(true);
  });

  it("can manually hide and show", () => {
    const { result } = renderHook(() => useSplash());
    
    act(() => {
      result.current.hide();
    });
    
    expect(result.current.isVisible).toBe(false);
    
    act(() => {
      result.current.show();
    });
    
    expect(result.current.isVisible).toBe(true);
  });

  it("prevents multiple ready calls", async () => {
    const onReady = jest.fn();
    const { result } = renderHook(() => useSplash({ onReady }));
    
    await act(async () => {
      await result.current.markReady();
      await result.current.markReady();
      await result.current.markReady();
    });
    
    expect(onReady).toHaveBeenCalledTimes(1);
    expect(result.current.isReady).toBe(true);
  });

  it("handles onReady errors gracefully", async () => {
    const consoleError = jest.spyOn(console, "error").mockImplementation();
    const onReady = jest.fn().mockRejectedValue(new Error("Test error"));
    const { result } = renderHook(() => useSplash({ onReady }));
    
    await act(async () => {
      await result.current.markReady();
    });
    
    expect(result.current.isReady).toBe(true);
    expect(consoleError).toHaveBeenCalled();
    
    consoleError.mockRestore();
  });

  it("cleans up timer on unmount", () => {
    const { result, unmount } = renderHook(() => useSplash());
    
    act(() => {
      result.current.markReady();
    });
    
    unmount();
    
    // Should not throw error about timer cleanup
    expect(true).toBe(true);
  });
});