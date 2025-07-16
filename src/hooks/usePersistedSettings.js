import { useState, useEffect } from 'react'

/**
 * Custom hook for persisting grouped settings to localStorage
 * @param {string} key - localStorage key
 * @param {object} defaultSettings - Default settings object
 * @returns {[object, function, function]} - [settings, updateSetting, resetSettings]
 */
export const usePersistedSettings = (key, defaultSettings) => {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved
        ? { ...defaultSettings, ...JSON.parse(saved) }
        : defaultSettings
    } catch (error) {
      console.warn(`Failed to load ${key}:`, error)
      return defaultSettings
    }
  })

  // Individual setter for updating specific fields
  const updateSetting = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }))
  }

  // Reset all settings to defaults
  const resetSettings = () => {
    try {
      localStorage.removeItem(key)
      setSettings(defaultSettings)
    } catch (error) {
      console.warn(`Failed to reset ${key}:`, error)
    }
  }

  // Save to localStorage whenever settings change
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(settings))
    } catch (error) {
      console.warn(`Failed to save ${key}:`, error)
    }
  }, [key, settings])

  return [settings, updateSetting, resetSettings]
}
